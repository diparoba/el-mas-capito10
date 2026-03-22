import './style.css';
import { renderSeverityChart } from './ChartComponent.js';

const API_URL = 'http://localhost:3000/api';

// --- Global State ---
let allScans = [];
let scanIdCounter = 200;

// --- DOM References ---
const grid = document.getElementById('metrics-grid');
const tableBody = document.getElementById('scans-table-body');

// ============================================================
//  ANIMATION: Smooth number counter from 0 to target
// ============================================================
function animateCounter(element, target, duration = 1200, suffix = '') {
    let start = 0;
    const startTime = performance.now();
    const isDecimal = String(target).includes('.');

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = start + (target - start) * ease;
        element.textContent = isDecimal ? current.toFixed(1) + suffix : Math.floor(current) + suffix;
        if (progress < 1) requestAnimationFrame(update);
        else element.textContent = isDecimal ? target.toFixed(1) + suffix : target + suffix;
    }
    requestAnimationFrame(update);
}

// ============================================================
//  SKELETON LOADERS
// ============================================================
function showSkeletons() {
    grid.innerHTML = `
        <div class="metric-card glass-effect skeleton-card">
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-value"></div>
            <div class="skeleton skeleton-bar"></div>
        </div>
        <div class="metric-card glass-effect skeleton-card">
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-value"></div>
            <div class="skeleton skeleton-bar"></div>
        </div>
        <div class="metric-card glass-effect skeleton-card">
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-value"></div>
            <div class="skeleton skeleton-bar"></div>
        </div>
        <div class="metric-card glass-effect skeleton-card">
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-value"></div>
            <div class="skeleton skeleton-bar"></div>
        </div>
    `;
    tableBody.innerHTML = `
        <tr><td colspan="5" class="skeleton-row"><div class="skeleton" style="height:18px; width:80%; border-radius:8px;"></div></td></tr>
        <tr><td colspan="5" class="skeleton-row"><div class="skeleton" style="height:18px; width:65%; border-radius:8px;"></div></td></tr>
        <tr><td colspan="5" class="skeleton-row"><div class="skeleton" style="height:18px; width:72%; border-radius:8px;"></div></td></tr>
    `;
}

// ============================================================
//  API FETCH
// ============================================================
async function fetchDashboardData() {
    try {
        const res = await fetch(`${API_URL}/dashboard`);
        if (!res.ok) throw new Error('API falló');
        setApiStatus(true);
        return await res.json();
    } catch (e) {
        setApiStatus(false);
        console.warn('Usando datos de demostración (API no disponible).');
        return {
            totalScans: 853,
            criticalAlerts: 42,
            registeredVehicles: 156,
            avgScanTime: 4.7,
            metrics: {
                labels: ['Crítico (Motor)', 'Advertencia (Trans.)', 'Info (Chasis)', 'Info (Red)'],
                data: [42, 120, 203, 15]
            }
        };
    }
}

async function fetchScansData() {
    try {
        const res = await fetch(`${API_URL}/scans`);
        if (!res.ok) throw new Error('API falló');
        return await res.json();
    } catch (e) {
        return [
            { id: 101, date: 'Hoy, 10:30 AM', vehicle: 'Hyundai Tucson 2021', severity: 'Crítico', status: 'Requiere Atención' },
            { id: 102, date: 'Hoy, 09:15 AM', vehicle: 'Kia Rio 2019', severity: 'Advertencia', status: 'En Progreso' },
            { id: 103, date: 'Ayer, 16:45 PM', vehicle: 'Ford Explorer 2018', severity: 'Sano', status: 'Completado' },
            { id: 104, date: 'Ayer, 11:20 AM', vehicle: 'Toyota Hilux 2022', severity: 'Advertencia', status: 'Requiere Atención' },
        ];
    }
}

// ============================================================
//  STATUS INDICATOR
// ============================================================
function setApiStatus(online) {
    const el = document.getElementById('api-status');
    if (!el) return;
    if (online) {
        el.innerHTML = `<span class="status-dot online"></span> API Conectada`;
        el.style.color = 'var(--status-good)';
    } else {
        el.innerHTML = `<span class="status-dot offline"></span> API Offline (modo demo)`;
        el.style.color = 'var(--status-warning)';
    }
}

// ============================================================
//  RENDER METRICS — 4 KPI cards with counters + progress bars
// ============================================================
function renderMetrics(data) {
    const avgTime = data.avgScanTime || 4.7;
    const totalMax = 1000, alertMax = 100, vehMax = 300, timeMax = 15;

    grid.innerHTML = `
        <div class="metric-card glass-effect" style="border-top: 2px solid var(--primary);">
            <span class="metric-title">Total Escaneos (Mes)</span>
            <span class="metric-value" id="kpi-scans" style="color: var(--primary); text-shadow: 0 0 20px var(--primary-glow);">0</span>
            <div class="metric-progress-track"><div class="metric-progress-bar" style="width:${(data.totalScans/totalMax)*100}%; background: var(--primary);"></div></div>
        </div>
        <div class="metric-card glass-effect" style="border-top: 2px solid var(--status-critical);">
            <span class="metric-title">Alertas Críticas Activas</span>
            <span class="metric-value" id="kpi-alerts" style="color: var(--status-critical); text-shadow: 0 0 20px rgba(255, 42, 95, 0.6);">0</span>
            <div class="metric-progress-track"><div class="metric-progress-bar" style="width:${(data.criticalAlerts/alertMax)*100}%; background: var(--status-critical);"></div></div>
        </div>
        <div class="metric-card glass-effect" style="border-top: 2px solid var(--secondary);">
            <span class="metric-title">Vehículos Registrados</span>
            <span class="metric-value" id="kpi-vehicles" style="color: var(--secondary); text-shadow: 0 0 20px var(--secondary-glow);">0</span>
            <div class="metric-progress-track"><div class="metric-progress-bar" style="width:${(data.registeredVehicles/vehMax)*100}%; background: var(--secondary);"></div></div>
        </div>
        <div class="metric-card glass-effect" style="border-top: 2px solid var(--status-good);">
            <span class="metric-title">Tiempo Promedio / Escaneo</span>
            <span class="metric-value" id="kpi-time" style="color: var(--status-good); text-shadow: 0 0 20px rgba(0,255,136,0.5);">0</span>
            <div class="metric-progress-track"><div class="metric-progress-bar" style="width:${(avgTime/timeMax)*100}%; background: var(--status-good);"></div></div>
        </div>
    `;

    // Fire counter animations after a brief delay
    setTimeout(() => {
        animateCounter(document.getElementById('kpi-scans'), data.totalScans);
        animateCounter(document.getElementById('kpi-alerts'), data.criticalAlerts);
        animateCounter(document.getElementById('kpi-vehicles'), data.registeredVehicles);
        animateCounter(document.getElementById('kpi-time'), avgTime, 1400, ' min');
    }, 200);
}

// ============================================================
//  RENDER TABLE (rows) + highlight effect on new row
// ============================================================
function renderTable(scans, highlightFirst = false) {
    allScans = scans;
    const filter = document.getElementById('severity-filter');
    const currentFilter = filter ? filter.value : 'all';
    applyFilter(currentFilter, highlightFirst);
}

function applyFilter(filterVal, highlightFirst = false) {
    const filtered = filterVal === 'all'
        ? allScans
        : allScans.filter(s => s.severity.toLowerCase().includes(filterVal.toLowerCase()));

    if (filtered.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 30px; color:var(--text-muted);">No hay escaneos en esta categoría.</td></tr>`;
        return;
    }

    tableBody.innerHTML = filtered.map((scan, idx) => {
        let badgeClass = 'good';
        if (scan.severity.includes('Crítico')) badgeClass = 'critical';
        else if (scan.severity.includes('Advertencia')) badgeClass = 'warning';

        const isNew = highlightFirst && idx === 0;
        return `
            <tr class="${isNew ? 'new-row-anim' : ''}">
                <td style="font-weight:600; color: var(--text-main);">
                    <span style="background:rgba(255,255,255,0.04); padding:3px 8px; border-radius:6px; font-size:0.8rem; color:var(--text-muted);">#${scan.id}</span>
                </td>
                <td style="font-weight: 500;">🚗 ${scan.vehicle}</td>
                <td style="color: var(--text-muted); font-size:0.9rem;">${scan.date}</td>
                <td><span class="badge ${badgeClass}">${scan.severity}</span></td>
                <td><span class="status-tag ${scan.status === 'Completado' ? 'tag-done' : scan.status === 'En Progreso' ? 'tag-progress' : 'tag-attention'}">${scan.status}</span></td>
            </tr>
        `;
    }).join('');
}

// ============================================================
//  NEW SCAN — adds a mock row at the top
// ============================================================
const mockVehicles = [
    'BMW X5 2023', 'Mercedes GLA 2022', 'Chevrolet Tracker 2021',
    'Mazda CX-5 2023', 'Nissan Frontier 2020', 'Renault Duster 2022',
    'Toyota Corolla 2021', 'Volkswagen Tiguan 2023'
];
const mockSeverities = ['Crítico', 'Advertencia', 'Sano'];
const mockStatuses = ['En Progreso', 'Requiere Atención', 'Completado'];

function addNewScan() {
    scanIdCounter++;
    const now = new Date();
    const timeStr = `Hoy, ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')} ${now.getHours() >= 12 ? 'PM':'AM'}`;
    const vehicle = mockVehicles[Math.floor(Math.random() * mockVehicles.length)];
    const severity = mockSeverities[Math.floor(Math.random() * mockSeverities.length)];
    const status = mockStatuses[Math.floor(Math.random() * mockStatuses.length)];

    const newScan = { id: scanIdCounter, date: timeStr, vehicle, severity, status };
    allScans.unshift(newScan);

    // Update KPI counter in place
    const kpiEl = document.getElementById('kpi-scans');
    if (kpiEl) {
        const current = parseInt(kpiEl.textContent.replace(/\D/g, '')) || 0;
        animateCounter(kpiEl, current + 1, 400);
    }

    renderTable(allScans, true);

    // Flash the "Vehículo Activo" card
    updateActiveVehicle(vehicle);
}

function updateActiveVehicle(vehicle) {
    const el = document.getElementById('active-vehicle-name');
    const card = document.getElementById('active-vehicle-card');
    if (!el || !card) return;
    el.textContent = vehicle;
    card.classList.remove('vehicle-pulse');
    void card.offsetWidth; // Reflow
    card.classList.add('vehicle-pulse');
}

// ============================================================
//  MAIN INIT
// ============================================================
async function initializeDashboard() {
    showSkeletons();

    const [dashboardData, scansData] = await Promise.all([
        fetchDashboardData(),
        fetchScansData()
    ]);

    renderMetrics(dashboardData);
    renderSeverityChart('severityChart', dashboardData.metrics);
    renderTable(scansData);

    // Wire up filter
    const filterEl = document.getElementById('severity-filter');
    if (filterEl) {
        filterEl.addEventListener('change', () => applyFilter(filterEl.value));
    }

    // Wire up new scan button
    const newScanBtn = document.getElementById('new-scan-btn');
    if (newScanBtn) {
        newScanBtn.addEventListener('click', addNewScan);
    }
}

// ============================================================
//  BOOT — Login gate then load
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginOverlay = document.getElementById('login-overlay');
    const appContainer = document.getElementById('app');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = document.querySelector('.btn-login');
        btn.textContent = 'Verificando Credenciales...';
        btn.style.opacity = '0.7';

        setTimeout(() => {
            loginOverlay.classList.add('hidden');
            appContainer.style.filter = 'blur(0px)';
            appContainer.style.transition = 'filter 0.5s ease';
            initializeDashboard();
        }, 900);
    });
});
