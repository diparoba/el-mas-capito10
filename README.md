# MotorScan Pro - Fase 1

Este proyecto es la **Interface Visual de Dashboard y Escaneos** para MotorScan Pro. Se divide en dos componentes principales: el backend (`api`) desarrollado en Node.js y Express, y el frontend (`frontend`) desarrollado con Vanilla JS y Vite.

## Requisitos Previos
- **Node.js y npm** instalados (comprobar con `node -v` y `npm -v`).
- **PostgreSQL** instalado y ejecutándose localmente (Puerto 5432, User: `postgres`, Password: `manchas120`). *(Nota: En esta Fase 1, se retornan principalmente mocks visuals por consola para pruebas, pero la librería `pg` ya está preparada para conectarse)*.

## 1. Inicializar el Backend (API)

El backend servirá nuestros datos estáticos iniciales a través de rutas API REST.

1. Abre tu terminal y navega hasta la carpeta del API:
   ```cmd
   cd api
   ```
2. Instala las dependencias:
   ```cmd
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```cmd
   npm run start
   ```
   > El servidor escuchará peticiones en `http://localhost:3000`.

## 2. Inicializar el Frontend

El frontend usa Vite para tener entorno de desarrollo rápido, recarga en vivo, estilo responsivo moderno y Gráficas de Telemetría (Chart.js).

1. Abre **otra** terminal y navega a la carpeta principal, y luego a la carpeta del frontend:
   ```cmd
   cd frontend
   ```
2. Instala las dependencias frontend:
   ```cmd
   npm install
   ```
3. Inicia el entorno de desarrollo Vite:
   ```cmd
   npm run dev
   ```
   > Automáticamente se te mostrará una URL local (generalmente `http://localhost:5173`) donde el panel de MotorScan Pro estará alojado. Ábrelo en tu navegador y verás tu nuevo Dashboard visual.

## Estructura del código actual
- `/api/server.js`: Contiene el mini-servidor con las rutas `/api/dashboard` y `/api/scans`.
- `/frontend/index.html`: Base del maquetado principal (Sidebar y Container).
- `/frontend/src/style.css`: Estilizado moderno, Glassmorphism usando variables y FlexBox/Grid.
- `/frontend/src/main.js`: Lógica de arranque del Dashboard.
- `/frontend/src/ChartComponent.js`: Integración de gráficas interactiva usando `Chart.js`.
