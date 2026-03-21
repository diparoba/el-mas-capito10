import Chart from 'chart.js/auto';

export function renderSeverityChart(canvasId, inputData) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    // Dark theme configuration for Chart.js
    Chart.defaults.color = '#8b949e';
    Chart.defaults.font.family = "'Inter', sans-serif";

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: inputData.labels,
            datasets: [{
                data: inputData.data,
                backgroundColor: [
                    '#ff4d4d',   // Crítico
                    '#ffa500',   // Advertencia
                    '#00e5ff',   // Info Chasis
                    '#6c2bd9'    // Info Red
                ],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '75%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(13, 17, 23, 0.9)',
                    titleColor: '#f0f6fc',
                    bodyColor: '#00e5ff',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    padding: 12,
                    boxPadding: 8
                }
            }
        }
    });
}
