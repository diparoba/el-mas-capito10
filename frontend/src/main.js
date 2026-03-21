import './style.css';
import { renderSeverityChart } from './ChartComponent.js';

const API_URL = 'http://localhost:3000/api';

// Elementos del DOM
const grid = document.getElementById('metrics-grid');
const tableBody = document.getElementById('scans-table-body');

// Función de inicialización
async function initializeDashboard() {
    try {
        // Obtenemos los datos del Backend Express
        const dashboardData = await fetchDashboardData();
        const scansData = await fetchScansData();

        // Renderizamos componentes
        renderMetrics(dashboardData);
        renderSeverityChart('severityChart', dashboardData.metrics);
        renderTable(scansData);
        
    } catch (error) {
        console.error("Error cargando dashboard:", error);
        grid.innerHTML = `<div class="metric-card glass-effect" style="color: #ff4d4d;">❌ Error conectando con API Node (Asegúrate de ejecutar 'npm start' en la carpeta api)</div>`;
        tableBody.innerHTML = `<tr><td colspan="4" style="color: #ff4d4d; text-align:center;">Falló la carga de datos</td></tr>`;
    }
}

// Fetch requests
async function fetchDashboardData() {
    try {
        const res = await fetch(`${API_URL}/dashboard`);
        if (!res.ok) throw new Error("API falló");
        return await res.json();
    } catch (e) {
        // Fallback for visual demo if API is not running
        console.warn("Usando datos de demostración visual (API no disponible).");
        return {
            totalScans: 853,
            criticalAlerts: 42,
            registeredVehicles: 156,
            metrics: {
                labels: ['Crítico (Motor)', 'Advertencia (Transmisión)', 'Info (Chasis)', 'Info (Red)'],
                data: [42, 120, 203, 15]
            }
        };
    }
}

async function fetchScansData() {
    try {
        const res = await fetch(`${API_URL}/scans`);
        if (!res.ok) throw new Error("API falló");
        return await res.json();
    } catch (e) {
         return [
             { id: 101, date: 'Hoy, 10:30 AM', vehicle: 'Hyundai Tucson 2021', severity: 'Crítico', status: 'Requiere Atención' },
             { id: 102, date: 'Hoy, 09:15 AM', vehicle: 'Kia Rio 2019', severity: 'Advertencia', status: 'En Progreso' },
             { id: 103, date: 'Ayer, 16:45 PM', vehicle: 'Ford Explorer 2018', severity: 'Sano', status: 'Completado' },
             { id: 104, date: 'Ayer, 11:20 AM', vehicle: 'Toyota Hilux 2022', severity: 'Advertencia', status: 'Requiere Atención' }
         ];
    }
}

// Renders
function renderMetrics(data) {
    grid.innerHTML = `
        <div class="metric-card glass-effect">
            <span class="metric-title">Total Escaneos (Mes)</span>
            <span class="metric-value" style="color: var(--primary); text-shadow: 0 0 10px var(--primary-glow);">${data.totalScans}</span>
        </div>
        <div class="metric-card glass-effect">
            <span class="metric-title">Alertas Críticas Activas</span>
            <span class="metric-value" style="color: var(--status-critical); text-shadow: 0 0 10px rgba(255, 77, 77, 0.4);">${data.criticalAlerts}</span>
        </div>
        <div class="metric-card glass-effect">
            <span class="metric-title">Vehículos Registrados</span>
            <span class="metric-value">${data.registeredVehicles}</span>
        </div>
    `;
}

function renderTable(scans) {
    tableBody.innerHTML = scans.map(scan => {
        let badgeClass = 'good';
        if (scan.severity.includes('Crítico')) badgeClass = 'critical';
        else if (scan.severity.includes('Advertencia')) badgeClass = 'warning';

        return `
            <tr>
                <td style="font-weight: 500;">🚗 ${scan.vehicle}</td>
                <td style="color: var(--text-muted);">${scan.date}</td>
                <td><span class="badge ${badgeClass}">${scan.severity}</span></td>
                <td>${scan.status}</td>
            </tr>
        `;
    }).join('');
}

// Iniciar aplicación cuando cargue el DOM
document.addEventListener('DOMContentLoaded', initializeDashboard);
