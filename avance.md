# Bitácora de Avance - MotorScan Pro

## Fase 1 - Diseño Base y Visualización (Completado)
### Logros Alcanzados
- Reestructurada la aplicación con arquitectura **Client-Servidor (Node JS y Vite CLI Frontend)**, reemplazando la base en .NET.
- Se ha diseñado una API estática en el servidor Express para simular datos reales como si vinieran de PostgreSQL.
- Dashboard construido con **Vanilla JS**, estilos modernos (`CSS Variables`, sombras, y un layout Responsive de panel lateral).
- Integración de **Chart.js** por NPM para crear gráficas visuales que muestran métricas de códigos DTC por severidad.
- Se construyó el listado emulado de escaneos de diagnóstico.
- Creados los scripts de arranque `README.md` y estructura de directorios.

## Fase 2 - Autenticación y Base de Datos (Pendiente)
- Integrar Sequelize/PG al API `server.js` conectándose totalmente a la base de datos `localhost` (puerto 5432).
- Crear las tablas (Migraciones) con la estructura de Usuarios (`User`) y Autenticación con JWT.
- Crear CRUD funcional de Vehículos y registrar Escaneos Reales en la placa y modelo del vehículo.

## Fase 3 - Complejidad de Telemetría (Pendiente)
- Reportes dinámicos por ID de Escaneo, guardando historial temporal.
- Gráficos en tiempo real (Sockets) para emular velocidad de RPM y lecturas en un dashboard por vehículo.
