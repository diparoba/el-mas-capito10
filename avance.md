# Bitácora de Avance - MotorScan Pro

## Fase 1 - Diseño Base y Visualización (Completado)
### Logros Alcanzados
- Reestructurada la aplicación con arquitectura **Client-Servidor (Node JS y Vite CLI Frontend)**, reemplazando la base en .NET.
- Se ha diseñado una API estática en el servidor Express para simular datos reales como si vinieran de PostgreSQL.
- Dashboard construido con **Vanilla JS**, estilos modernos (`CSS Variables`, sombras, y un layout Responsive de panel lateral).
- Integración de **Chart.js** por NPM para crear gráficas visuales que muestran métricas de códigos DTC por severidad.
- Se ha organizado la documentación: `README.md` en la raíz y requerimientos detallados en `requerimientos.md`.
- Se ha diseñado el esquema completo migrando de ASP.NET a Node.js/Sequelize (Code-First) con la aprobación del usuario.

## Fase 2 - Autenticación y Base de Datos (PENDIENTE)
- [ ] Configurar conexión real a **PostgreSQL** con Sequelize (Password: `Admin.0303`).
- [ ] Implementar modelos Code-First: `User`, `Vehicle`, `Scan`, `DTC`, `Parameter`, `Report`.
- [ ] Desarrollar sistema de autenticación con **JWT** y hashing de contraseñas con **Bcrypt**.
- [ ] Crear endpoints de Registro e Inicio de Sesión funcionales.

## Fase 3 - Gestión de Vehículos y Diagnóstico (PENDIENTE)
- [ ] Implementar CRUD de vehículos vinculado al usuario autenticado.
- [ ] Crear flujo de "Nuevo Escaneo" que capture y guarde DTCs y parámetros reales en la DB.
- [ ] Implementar lógica de cálculo de severidad y estado general del motor.

## Fase 4 - Reportes y Telemetría Final (PENDIENTE)
- [ ] Generación automática de reportes de diagnóstico tras cada escaneo.
- [ ] Vista de reporte imprimible con recomendaciones del técnico.
- [ ] Gráficos de telemetría dinámica basados en el historial de parámetros capturados.
