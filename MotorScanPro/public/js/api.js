// MotorScan Pro — API Client
const API = 'http://localhost:3000/api';

function getToken() { return localStorage.getItem('msToken'); }
function getUser() { try { return JSON.parse(localStorage.getItem('msUser')); } catch { return null; } }

function setAuth(token, user) {
  localStorage.setItem('msToken', token);
  localStorage.setItem('msUser', JSON.stringify(user));
}

function clearAuth() {
  localStorage.removeItem('msToken');
  localStorage.removeItem('msUser');
}

function requireAuth() {
  if (!getToken()) { window.location.href = '/login.html'; return false; }
  return true;
}

async function apiFetch(path, opts = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API}${path}`, { ...opts, headers });
  if (res.status === 401) { clearAuth(); window.location.href = '/login.html'; return; }
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Error desconocido' }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

function showToast(msg) {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

function formatDate(d) {
  return new Date(d).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' });
}

function badgeClass(val) {
  const map = { 'Bueno': 'badge-ok', 'Regular': 'badge-warn', 'Critico': 'badge-critical',
    'Completado': 'badge-ok', 'En Progreso': 'badge-info', 'Requiere Atencion': 'badge-critical',
    'Informativo': 'badge-info', 'Advertencia': 'badge-warn' };
  return map[val] || 'badge-info';
}

function severityCodeClass(s) {
  return { 'Critico': 'critical', 'Advertencia': 'warn', 'Informativo': 'info' }[s] || 'info';
}

function initSidebar() {
  const user = getUser();
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  // Highlight active nav
  const page = window.location.pathname.split('/').pop() || 'index.html';
  sidebar.querySelectorAll('.nav-item').forEach(el => {
    if (el.getAttribute('href') === page || (page === '' && el.getAttribute('href') === 'index.html')) {
      el.classList.add('active');
    }
  });

  // User info
  if (user) {
    const avatar = sidebar.querySelector('.user-avatar');
    const name = sidebar.querySelector('.user-details .name');
    const role = sidebar.querySelector('.user-details .role');
    if (avatar) avatar.textContent = user.nombre.split(' ').map(w => w[0]).join('').slice(0, 2);
    if (name) name.textContent = user.nombre;
    if (role) role.textContent = user.rol;
  }

  // Mobile toggle
  const toggle = document.querySelector('.mobile-toggle');
  if (toggle) toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
}

function logout() {
  clearAuth();
  window.location.href = '/login.html';
}
