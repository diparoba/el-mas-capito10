# 🔧 MotorScan Pro — Diagnóstico y Escaneo de Motores

Aplicación web para talleres mecánicos que permite registrar vehículos, ejecutar diagnósticos OBD-II, capturar códigos de error (DTC), monitorear parámetros del motor en tiempo real y generar reportes de diagnóstico.

![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-v5-000000?style=flat&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-Code--First-003B57?style=flat&logo=sqlite&logoColor=white)

---

## 📋 Tabla de Contenidos

- [Tecnologías Requeridas](#-tecnologías-requeridas)
- [Instalación y Despliegue](#-instalación-y-despliegue)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Credenciales de Prueba](#-credenciales-de-prueba)
- [API Endpoints](#-api-endpoints)
- [Módulos](#-módulos)
- [Base de Datos Code-First](#-base-de-datos-code-first)

---

## 🛠 Tecnologías Requeridas

Antes de desplegar, asegúrate de tener instalado:

| Tecnología | Versión Mínima | Descarga |
|---|---|---|
| **Node.js** | v18.0.0+ | [nodejs.org](https://nodejs.org/) |
| **npm** | v9.0.0+ | Incluido con Node.js |

### Dependencias del Proyecto (se instalan automáticamente)

| Paquete | Uso |
|---|---|
| `express` | Framework web (servidor HTTP + API REST) |
| `sequelize` | ORM Code-First para modelado de base de datos |
| `sqlite3` | Base de datos SQLite (sin configuración) |
| `jsonwebtoken` | Autenticación JWT |
| `bcryptjs` | Hash de contraseñas |
| `cors` | Soporte Cross-Origin para API |
| `chart.js` | Gráficas (cargado vía CDN) |

---

## 🚀 Instalación y Despliegue

### Paso 1: Clonar/Descargar el proyecto

```bash
git clone <url-del-repositorio>
cd el-mas-capito10/MotorScanPro
```

### Paso 2: Instalar dependencias

```bash
npm install
```

> **Nota (Windows):** Si tienes problemas con la ejecución de scripts en PowerShell, ejecuta primero:
> ```powershell
> Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
> ```

### Paso 3: Iniciar la aplicación

```bash
npm start
```

La aplicación:
1. ✅ Creará la base de datos SQLite automáticamente (Code-First)
2. ✅ Creará todas las tablas desde los modelos Sequelize
3. ✅ Insertará datos de prueba (seed data)
4. ✅ Iniciará el servidor en `http://localhost:3000`

### Paso 4: Abrir en el navegador

```
http://localhost:3000
```

---

## 🔐 Credenciales de Prueba

| Rol | Email | Contraseña |
|---|---|---|
| **Administrador** | `admin@motorscan.com` | `admin123` |
| **Técnico** | `tecnico@motorscan.com` | `tecnico123` |

---

## 📁 Estructura del Proyecto

```
MotorScanPro/
├── server.js              # Punto de entrada principal
├── package.json           # Dependencias y scripts
├── database.sqlite        # BD SQLite (auto-generada)
│
├── models/                # Modelos Code-First (Sequelize)
│   ├── index.js           # Configuración DB + asociaciones
│   ├── User.js            # Usuarios (Admin/Técnico)
│   ├── Vehicle.js         # Vehículos
│   ├── Scan.js            # Escaneos de diagnóstico
│   ├── DiagnosticCode.js  # Códigos DTC (OBD-II)
│   ├── EngineParameter.js # Parámetros del motor
│   └── Report.js          # Reportes de diagnóstico
│
├── controllers/           # Controladores API REST
│   ├── auth.js            # Login/Register (JWT)
│   ├── vehicles.js        # CRUD vehículos
│   ├── scans.js           # CRUD escaneos + códigos + parámetros
│   └── dashboard.js       # Estadísticas y alertas
│
├── services/
│   └── auth.js            # Servicio JWT + middleware
│
├── data/
│   └── seed.js            # Datos de prueba
│
└── public/                # Frontend estático
    ├── index.html         # Dashboard principal
    ├── login.html         # Inicio de sesión
    ├── vehicles.html      # Gestión de vehículos
    ├── vehicle-detail.html # Detalle de vehículo
    ├── scans.html         # Lista de escaneos
    ├── scan.html          # Detalle de escaneo (DTC + gráficas)
    ├── report.html        # Reporte de diagnóstico (imprimible)
    ├── reports.html       # Lista de reportes
    ├── css/styles.css     # Sistema de diseño completo
    └── js/api.js          # Cliente API + utilidades
```

---

## 🔌 API Endpoints

### Autenticación
| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/auth/login` | Iniciar sesión |
| POST | `/api/auth/register` | Registrar usuario |
| GET | `/api/auth/me` | Usuario actual (requiere token) |

### Vehículos
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/vehicles` | Listar todos los vehículos |
| GET | `/api/vehicles/:id` | Detalle de vehículo |
| POST | `/api/vehicles` | Crear vehículo 🔒 |
| PUT | `/api/vehicles/:id` | Actualizar vehículo 🔒 |
| DELETE | `/api/vehicles/:id` | Eliminar vehículo 🔒 |

### Escaneos
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/scans` | Listar todos los escaneos |
| GET | `/api/scans/:id` | Detalle completo del escaneo |
| POST | `/api/scans` | Crear escaneo 🔒 |
| POST | `/api/scans/:id/codes` | Agregar código DTC 🔒 |
| POST | `/api/scans/:id/parameters` | Agregar parámetro 🔒 |
| POST | `/api/scans/:id/report` | Generar reporte 🔒 |

### Dashboard
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/dashboard` | Estadísticas y resumen |

> 🔒 = Requiere token JWT en header `Authorization: Bearer <token>`

---

## 📊 Módulos

1. **Dashboard** — Resumen con 4 gráficas, estadísticas, escaneos recientes y alertas críticas
2. **Gestión de Vehículos** — CRUD completo con tarjetas visuales y estado del motor
3. **Escaneo de Motor** — Códigos DTC clasificados por sistema y severidad, parámetros del motor con gráficas en tiempo real
4. **Reportes** — Reportes de diagnóstico imprimibles con datos del vehículo, códigos, parámetros y recomendaciones del técnico
5. **Autenticación** — Login con JWT, roles Administrador/Técnico

---

## 💾 Base de Datos Code-First

La base de datos se genera automáticamente a partir de los modelos Sequelize (**Code-First**):

1. Los modelos en `models/` definen la estructura de las tablas
2. Al ejecutar `npm start`, Sequelize sincroniza los modelos con SQLite
3. Las tablas se crean automáticamente si no existen
4. Los datos de prueba se insertan en la primera ejecución

### Diagrama de Entidades

```
User (1) ──→ (N) Vehicle (1) ──→ (N) Scan (1) ──→ (N) DiagnosticCode
  │                                    │ (1) ──→ (N) EngineParameter
  │                                    │ (1) ──→ (1) Report
  └──────────────────────────────(N)───┘
```

### Resetear la base de datos

Para regenerar la BD desde cero, elimina el archivo `database.sqlite` y reinicia:

```bash
del database.sqlite    # Windows
npm start
```

---

## 📝 Datos de Prueba Incluidos

- **2 usuarios**: 1 Administrador + 1 Técnico
- **4 vehículos**: Toyota Corolla, Chevrolet Spark, Ford Explorer, Hyundai Tucson
- **5 escaneos**: Con diferentes estados (Bueno, Regular, Crítico)
- **10 códigos DTC**: Incluyendo P0301, P0420, P0455, C0035, U0100
- **~160 parámetros**: RPM, Temperatura, Voltaje, Carga, Presión de combustible
- **3 reportes**: Con recomendaciones del técnico
