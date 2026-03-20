const bcrypt = require('bcryptjs');

async function seedDatabase({ User, Vehicle, Scan, DiagnosticCode, EngineParameter, Report }) {
  const count = await User.count();
  if (count > 0) return; // Already seeded

  console.log('🌱 Seeding database...');

  // --- Users ---
  const admin = await User.create({
    nombre: 'Carlos Mendoza',
    email: 'admin@motorscan.com',
    passwordHash: await bcrypt.hash('admin123', 10),
    rol: 'Administrador',
    nombreTaller: 'AutoTech Diagnósticos'
  });

  const tecnico = await User.create({
    nombre: 'Luis Ramírez',
    email: 'tecnico@motorscan.com',
    passwordHash: await bcrypt.hash('tecnico123', 10),
    rol: 'Tecnico',
    nombreTaller: 'AutoTech Diagnósticos'
  });

  // --- Vehicles ---
  const v1 = await Vehicle.create({
    marca: 'Toyota', modelo: 'Corolla', anio: 2020, vin: '1HGBH41JXMN109186',
    placa: 'ABC-1234', tipoMotor: '1.8L 4-Cilindros', kilometraje: 45000, userId: admin.id
  });

  const v2 = await Vehicle.create({
    marca: 'Chevrolet', modelo: 'Spark', anio: 2019, vin: '2FMDK3GC5BBA12345',
    placa: 'XYZ-5678', tipoMotor: '1.4L 4-Cilindros', kilometraje: 62000, userId: admin.id
  });

  const v3 = await Vehicle.create({
    marca: 'Ford', modelo: 'Explorer', anio: 2021, vin: '3GNAXNEX5ML123456',
    placa: 'DEF-9012', tipoMotor: '2.3L EcoBoost Turbo', kilometraje: 28000, userId: admin.id
  });

  const v4 = await Vehicle.create({
    marca: 'Hyundai', modelo: 'Tucson', anio: 2022, vin: '5NPD84LF1JH654321',
    placa: 'GHI-3456', tipoMotor: '2.0L GDI', kilometraje: 15000, userId: tecnico.id
  });

  // --- Scans ---
  const s1 = await Scan.create({
    fecha: new Date('2026-03-15'), estado: 'Completado', estadoGeneral: 'Regular',
    notasTecnico: 'Fallo de encendido en cilindro 1. Se recomienda cambio de bujías y revisión de cables.', vehicleId: v1.id, userId: tecnico.id
  });

  const s2 = await Scan.create({
    fecha: new Date('2026-03-18'), estado: 'Completado', estadoGeneral: 'Critico',
    notasTecnico: 'Catalizador con eficiencia por debajo del umbral. Sensor de O2 posterior defectuoso. Reparación urgente.', vehicleId: v2.id, userId: tecnico.id
  });

  const s3 = await Scan.create({
    fecha: new Date('2026-03-19'), estado: 'Completado', estadoGeneral: 'Bueno',
    notasTecnico: 'Motor en buen estado. Presión de combustible normal. Sin códigos activos.', vehicleId: v3.id, userId: tecnico.id
  });

  const s4 = await Scan.create({
    fecha: new Date('2026-03-20'), estado: 'En Progreso', estadoGeneral: 'Regular',
    notasTecnico: 'Escaneo en progreso...', vehicleId: v4.id, userId: admin.id
  });

  const s5 = await Scan.create({
    fecha: new Date('2026-03-10'), estado: 'Requiere Atencion', estadoGeneral: 'Critico',
    notasTecnico: 'Múltiples fallos detectados. Sensor MAF fuera de rango. Fuga en sistema EVAP.', vehicleId: v1.id, userId: tecnico.id
  });

  // --- Diagnostic Codes ---
  await DiagnosticCode.bulkCreate([
    // Scan 1 - Toyota Corolla
    { codigo: 'P0301', descripcion: 'Fallo de encendido detectado - Cilindro 1', sistema: 'Motor', severidad: 'Advertencia', scanId: s1.id },
    { codigo: 'P0171', descripcion: 'Sistema demasiado pobre (Banco 1)', sistema: 'Motor', severidad: 'Informativo', scanId: s1.id },
    // Scan 2 - Chevrolet Spark
    { codigo: 'P0420', descripcion: 'Eficiencia del catalizador por debajo del umbral (Banco 1)', sistema: 'Motor', severidad: 'Critico', scanId: s2.id },
    { codigo: 'P0136', descripcion: 'Sensor de O2 - Mal funcionamiento del circuito (Banco 1, Sensor 2)', sistema: 'Motor', severidad: 'Critico', scanId: s2.id },
    { codigo: 'P0440', descripcion: 'Sistema de control de emisiones evaporativas - Mal funcionamiento', sistema: 'Motor', severidad: 'Advertencia', scanId: s2.id },
    // Scan 3 - Ford Explorer (sin códigos activos)
    // Scan 4 - Hyundai Tucson
    { codigo: 'P0102', descripcion: 'Sensor MAF - Entrada baja del circuito', sistema: 'Motor', severidad: 'Advertencia', scanId: s4.id },
    // Scan 5 - Toyota Corolla (segundo escaneo)
    { codigo: 'P0455', descripcion: 'Fuga grande en sistema EVAP detectada', sistema: 'Motor', severidad: 'Critico', scanId: s5.id },
    { codigo: 'P0101', descripcion: 'Sensor MAF - Rango/Rendimiento fuera de parámetros', sistema: 'Motor', severidad: 'Critico', scanId: s5.id },
    { codigo: 'C0035', descripcion: 'Circuito del sensor de velocidad de rueda izquierda delantera', sistema: 'Chasis', severidad: 'Advertencia', scanId: s5.id },
    { codigo: 'U0100', descripcion: 'Comunicación perdida con ECM/PCM "A"', sistema: 'Red/Comunicacion', severidad: 'Critico', scanId: s5.id },
  ]);

  // --- Engine Parameters ---
  const baseTime = new Date('2026-03-15T10:00:00');
  const params = [];
  for (let i = 0; i < 10; i++) {
    const t = new Date(baseTime.getTime() + i * 30000);
    params.push(
      { nombre: 'RPM', valor: 750 + Math.random() * 200, unidad: 'rpm', timestamp: t, scanId: s1.id },
      { nombre: 'Temperatura Refrigerante', valor: 85 + Math.random() * 10, unidad: '°C', timestamp: t, scanId: s1.id },
      { nombre: 'Velocidad', valor: i * 12 + Math.random() * 5, unidad: 'km/h', timestamp: t, scanId: s1.id },
      { nombre: 'Carga Motor', valor: 20 + Math.random() * 30, unidad: '%', timestamp: t, scanId: s1.id },
      { nombre: 'Voltaje Batería', valor: 13.5 + Math.random() * 1, unidad: 'V', timestamp: t, scanId: s1.id },
      { nombre: 'Presión Combustible', valor: 350 + Math.random() * 50, unidad: 'kPa', timestamp: t, scanId: s1.id },
      { nombre: 'Posición Acelerador', valor: 10 + Math.random() * 40, unidad: '%', timestamp: t, scanId: s1.id }
    );
  }

  // Scan 2 params (critical vehicle)
  for (let i = 0; i < 10; i++) {
    const t = new Date(new Date('2026-03-18T14:00:00').getTime() + i * 30000);
    params.push(
      { nombre: 'RPM', valor: 850 + Math.random() * 400, unidad: 'rpm', timestamp: t, scanId: s2.id },
      { nombre: 'Temperatura Refrigerante', valor: 95 + Math.random() * 15, unidad: '°C', timestamp: t, scanId: s2.id },
      { nombre: 'Carga Motor', valor: 40 + Math.random() * 40, unidad: '%', timestamp: t, scanId: s2.id },
      { nombre: 'Voltaje Batería', valor: 12.8 + Math.random() * 0.5, unidad: 'V', timestamp: t, scanId: s2.id }
    );
  }

  // Scan 3 params (healthy vehicle)
  for (let i = 0; i < 8; i++) {
    const t = new Date(new Date('2026-03-19T09:00:00').getTime() + i * 30000);
    params.push(
      { nombre: 'RPM', valor: 700 + Math.random() * 100, unidad: 'rpm', timestamp: t, scanId: s3.id },
      { nombre: 'Temperatura Refrigerante', valor: 82 + Math.random() * 5, unidad: '°C', timestamp: t, scanId: s3.id },
      { nombre: 'Voltaje Batería', valor: 14.0 + Math.random() * 0.3, unidad: 'V', timestamp: t, scanId: s3.id },
      { nombre: 'Presión Combustible', valor: 370 + Math.random() * 20, unidad: 'kPa', timestamp: t, scanId: s3.id }
    );
  }

  await EngineParameter.bulkCreate(params);

  // --- Reports ---
  await Report.bulkCreate([
    { fechaGeneracion: new Date('2026-03-15'), recomendaciones: '1. Cambio de bujías en cilindro 1\n2. Inspección de cables de encendido\n3. Limpieza de inyectores\n4. Re-escanear en 1,000 km', scanId: s1.id },
    { fechaGeneracion: new Date('2026-03-18'), recomendaciones: '1. URGENTE: Reemplazo de catalizador\n2. Reemplazo de sensor de O2 (Banco 1, Sensor 2)\n3. Reparar sistema EVAP\n4. Re-escanear inmediatamente después de reparación', scanId: s2.id },
    { fechaGeneracion: new Date('2026-03-19'), recomendaciones: '1. Motor en excelente estado\n2. Continuar mantenimiento regular cada 10,000 km\n3. Próximo escaneo recomendado en 6 meses', scanId: s3.id },
  ]);

  console.log('✅ Database seeded with sample data');
}

module.exports = seedDatabase;
