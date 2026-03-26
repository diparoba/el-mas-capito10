# Especificación de Diseño: MotorScan Pro Full Implementation

**Fecha**: 2026-03-26  
**Proyecto**: MotorScan Pro  
**Tecnologías**: Node.js, Express, Sequelize, PostgreSQL, Vanilla JS, JWT, Bcrypt.

## 1. Introducción
MotorScan Pro es un sistema de gestión y diagnóstico automotriz. Esta especificación detalla la transición de un prototipo visual a una aplicación robusta con persistencia de datos real, autenticación y funcionalidades completas de taller.

## 2. Arquitectura del Sistema
Se utilizará un patrón **MVC (Modelo-Vista-Controlador)** en el backend para asegurar la separación de responsabilidades:

- **Estructura de Carpetas (API)**:
    - `/models`: Definiciones de Sequelize (Code-First).
    - `/controllers`: Lógica de negocio y manejo de peticiones.
    - `/routes`: Definición de endpoints REST.
    - `/middleware`: Seguridad (JWT) y validaciones.
    - `/config`: Conexión a la base de datos (PostgreSQL).

- **Estructura de Carpetas (Frontend)**:
    - `/src`: Modularización por componentes (dashboard, vehicles, scans).

## 3. Modelo de Datos (Sequelize)

### User
- `id`: UUID (PK)
- `name`: String
- `email`: String (Unique)
- `passwordHash`: String
- `role`: Enum (ADMIN, TECH)
- `workshopName`: String

### Vehicle
- `id`: UUID (PK)
- `brand`: String
- `model`: String
- `year`: Integer
- `vin`: String (Unique)
- `plate`: String
- `engineType`: String
- `mileage`: Integer
- `userId`: UUID (FK -> User)

### Scan
- `id`: UUID (PK)
- `date`: Date
- `status`: Enum (IN_PROGRESS, COMPLETED, ATTENTION_REQUIRED)
- `notes`: Text
- `generalCondition`: String
- `vehicleId`: UUID (FK -> Vehicle)
- `userId`: UUID (FK -> User)

### DiagnosticCode (DTC)
- `id`: UUID (PK)
- `code`: String (ej: P0301)
- `description`: String
- `system`: String
- `severity`: Enum (CRITICAL, WARNING, INFO)
- `scanId`: UUID (FK -> Scan)

### EngineParameter
- `id`: UUID (PK)
- `name`: String (ej: RPM)
- `value`: Float
- `unit`: String
- `timestamp`: Date
- `scanId`: UUID (FK -> Scan)

### Report
- `id`: UUID (PK)
- `generationDate`: Date
- `recommendations`: Text
- `scanId`: UUID (FK -> Scan)

## 4. Seguridad y Autenticación
- **JWT**: Firma de tokens persistente de 24h.
- **Bcrypt**: Hashing de contraseñas con salt rounds de 10.
- **Autorización**: Middleware `verifyToken` para proteger endpoints privados.

## 5. Endpoints de la API (Resumen)
- `POST /api/auth/register` & `POST /api/auth/login`
- `GET/POST /api/vehicles` (CRUD de vehículos del usuario)
- `GET/POST /api/scans` (Registrar y consultar escaneos)
- `GET /api/scans/:id/report` (Obtener datos para el reporte)
- `GET /api/dashboard/stats` (Métricas agregadas)

## 6. Funcionalidades del Frontend
- **Flujo de Diagnóstico**: Un asistente paso a paso para simular la captura de datos OBD-II.
- **Dashboard Dinámico**: Uso de `Chart.js` conectado a datos reales de la base de datos.
- **Vista de Reporte**: Plantilla HTML preparada para impresión/PDF.

## 7. Plan de Verificación
- Pruebas manuales de CRUD de vehículos.
- Verificación de persistencia tras reinicio de servidores.
- Validación de que los técnicos solo ven sus propios vehículos/escaneos.
