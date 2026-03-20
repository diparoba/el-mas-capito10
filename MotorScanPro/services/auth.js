const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'motorscan-pro-secret-key-2026';

function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, rol: user.rol },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'Token requerido' });

  const token = header.split(' ')[1];
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

module.exports = { generateToken, authMiddleware, JWT_SECRET, bcrypt };
