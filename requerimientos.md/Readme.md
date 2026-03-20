# 🔧 Requerimientos - MotorScan Pro

## 1. Descripción General

**MotorScan Pro** es una aplicación web de diagnóstico y escaneo de motores de vehículos. Permite a talleres mecánicos y técnicos automotrices registrar vehículos, ejecutar escaneos de diagnóstico (OBD-II), visualizar códigos de error (DTC), monitorear parámetros en tiempo real del motor, y generar reportes de diagnóstico para sus clientes.

---

## 2. Módulos del Sistema

### 2.1 Gestión de Usuarios
- Registro e inicio de sesión con roles (Administrador, Técnico)
- Perfil de usuario con datos del taller
- Autenticación con JWT

### 2.2 Gestión de Vehículos
- Registro de vehículos (marca, modelo, año, VIN, placa, tipo de motor, kilometraje)
- Historial de escaneos por vehículo
- Búsqueda y filtrado de vehículos

### 2.3 Escaneo de Motor (Diagnóstico)
- Registrar un nuevo escaneo vinculado a un vehículo
- Capturar códigos de error DTC (ej: P0301, P0420, C0035)
- Clasificación de códigos por sistema: Motor, Transmisión, Chasis, Red/Comunicación
- Severidad del código: Crítico, Advertencia, Informativo
- Estado del escaneo: En Progreso, Completado, Requiere Atención

### 2.4 Parámetros del Motor (Telemetría)
- Registro de parámetros capturados durante el escaneo:
  - RPM
  - Temperatura del refrigerante (°C)
  - Velocidad del vehículo (km/h)
  - Carga del motor (%)
  - Voltaje de la batería (V)
  - Presión del combustible (kPa)
  - Posición del acelerador (%)
- Visualización de parámetros con gráficas

### 2.5 Reportes de Diagnóstico
- Generación de reporte por escaneo con:
  - Datos del vehículo
  - Códigos de error encontrados con descripción
  - Parámetros capturados
  - Recomendaciones del técnico
  - Estado general del motor (Bueno, Regular, Crítico)
- Exportación del reporte (vista imprimible)

### 2.6 Dashboard Principal
- Resumen de escaneos recientes
- Vehículos con alertas críticas
- Estadísticas: total de escaneos, códigos más frecuentes, vehículos registrados
- Gráficas de actividad

---

## 3. Requisitos Técnicos

### 3.1 Backend
- **ASP.NET Core 8 Web API**
- **Entity Framework Core** con enfoque **Code-First**
- **SQL Server** como base de datos
- Patrón de arquitectura: Controladores → Servicios → Repositorios
- Autenticación JWT
- Seed data con datos de prueba

### 3.2 Frontend
- **HTML5, CSS3, JavaScript** (Vanilla)
- Diseño responsive y moderno
- Gráficas con Chart.js
- Consumo de API REST con Fetch API

### 3.3 Base de Datos (Code-First)
- Migraciones con EF Core
- Modelos/Entidades:
  - `User` (Id, Nombre, Email, PasswordHash, Rol, NombreTaller)
  - `Vehicle` (Id, Marca, Modelo, Año, VIN, Placa, TipoMotor, Kilometraje, UserId)
  - `Scan` (Id, Fecha, Estado, NotasTecnico, EstadoGeneral, VehicleId, UserId)
  - `DiagnosticCode` (Id, Codigo, Descripcion, Sistema, Severidad, ScanId)
  - `EngineParameter` (Id, Nombre, Valor, Unidad, Timestamp, ScanId)
  - `Report` (Id, FechaGeneracion, Recomendaciones, ScanId)

---

## 4. Requisitos No Funcionales
- La aplicación debe funcionar localmente (localhost)
- Seed data con al menos 3 vehículos, 5 escaneos y códigos de ejemplo
- Interfaz intuitiva y profesional orientada a talleres mecánicos
- Código documentado y organizado

---

## 5. Entregables
- Código fuente completo (Backend + Frontend)
- Base de datos generada por migraciones Code-First
- Archivo README.md con guía de despliegue
- Datos semilla para pruebas