# Requerimientos - MotorScan Pro (Fase 1: Dashboard y Arquitectura Base)

## 1. Descripción del Proyecto 
**MotorScan Pro Fase 1** es el inicio de la aplicación web encargada del escaneo y diagnóstico de motores de vehículos. En esta fase, estableceremos la arquitectura general (creando un entorno Frontend separado del Backend) y nos enfocaremos en la parte visual clave: **El Dashboard y la UI de Escaneos** usando respuestas simuladas (Mock Data) desde nuestra propia API.

## 2. Decisiones Técnicas Acordadas (Cambios frente al Requerimiento Original)
- **Backend Framework:** Pasamos de ASP.NET Core a **Node.js con Express**.
- **Base de Datos:** Pasamos de SQL Server a **PostgreSQL** (localhost puerto 5432, user: `postgres`, pwd: `manchas120`).
- **Frontend Architecture:** En lugar de ser entregado monolíticamente con el Backend o plantillas, utilizaremos **Vanilla JS paquetizado con Vite**.

## 3. Estructura de Proyecto Proyectada
```text
el-mas-capito10/
├── api/                   # Backend Node.js
│   ├── package.json
│   ├── server.js          # API Server
│   └── routes/            # Endpoints (Dashboard, Escaneos Simulados)
│
├── frontend/              # Frontend Vite + Vanilla JS
│   ├── index.html
│   ├── package.json
│   ├── src/
│   │   ├── main.js
│   │   ├── styles.css     # CSS Puro y Variables (Diseño Moderno)
│   │   └── components/    # Gráficas, Menús
│   └── public/
│
├── README.md              # Documentación e instrucciones de inicio (Back y Front)
└── avance.md              # Bitácora de progreso
```

## 4. Diseño del Dashboard (Componentes a crear)
1. **Sidebar:** Navegación por la app.
2. **Dashboard de Inicio:** Tarjetas informativas de Resumen.
3. **Escaneos (Gráfico Chart.js):** Graficaremos la relación entre severidad de problemas en los registros falsos para dar validación visual del UI.
4. **Listado de Escaneos Recientes:** Tabla que recuperará datos estáticos desde el backend.

## 5. Próximos Pasos (Flujo de implementación)
1. Crear carpeta `api` e inicializar el servidor Node.js/Express.
2. Definir la ruta `/api/dashboard` y `/api/scans` devolviendo datos en formato JSON.
3. Crear carpeta `frontend` mediante Vite Vanilla.
4. Implementar diseño web responsivo para el Dashboard integrando `Chart.js`.
5. Probar consumos Fetch y dejar documentado `README.md` y `avance.md`.
