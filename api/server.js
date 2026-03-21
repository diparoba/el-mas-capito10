const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Configuración de Middlewares
app.use(cors());
app.use(express.json());

// Datos de Prueba (Simulación para Fase 1)
const mockDashboardData = {
    totalScans: 142,
    criticalAlerts: 18,
    registeredVehicles: 85,
    metrics: {
        labels: ['Motor (Crítico)', 'Transmisión (Advertencia)', 'Chasis (Info)', 'Red (Info)'],
        data: [45, 25, 20, 10]
    }
};

const mockScans = [
    { id: 1, date: '2026-03-21', vehicle: 'Toyota Hilux Placa ABC-1234', status: 'En Progreso', severity: 'Advertencia' },
    { id: 2, date: '2026-03-20', vehicle: 'Ford Explorer Placa PQR-987', status: 'Completado', severity: 'Crítico (P0301)' },
    { id: 3, date: '2026-03-19', vehicle: 'Honda Civic Placa XYZ-456', status: 'Requiere Atención', severity: 'Advertencia' },
    { id: 4, date: '2026-03-18', vehicle: 'Chevrolet Spark Placa MNO-111', status: 'Completado', severity: 'Sano' }
];

// Rutas de API
app.get('/api/dashboard', (req, res) => {
    res.json(mockDashboardData);
});

app.get('/api/scans', (req, res) => {
    res.json(mockScans);
});

app.get('/api/health', (req, res) => {
    res.json({ message: 'MotorScan API is running!' });
});

// Inicialización del Servidor
app.listen(PORT, () => {
    console.log(`[🚀] MotorScan Pro API corriendo en http://localhost:${PORT}`);
    console.log(`[📖] Endpoint Dashboard -> http://localhost:${PORT}/api/dashboard`);
});
