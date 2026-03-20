const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { generateToken, bcrypt } = require('../services/auth');

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { nombre, email, password, rol, nombreTaller } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ error: 'El email ya está registrado' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ nombre, email, passwordHash, rol: rol || 'Tecnico', nombreTaller });
    const token = generateToken(user);
    res.status(201).json({ token, user: { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol, nombreTaller: user.nombreTaller } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Credenciales incorrectas' });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: 'Credenciales incorrectas' });

    const token = generateToken(user);
    res.json({ token, user: { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol, nombreTaller: user.nombreTaller } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/auth/me
router.get('/me', require('../services/auth').authMiddleware, async (req, res) => {
  const user = await User.findByPk(req.user.id, { attributes: { exclude: ['passwordHash'] } });
  res.json(user);
});

module.exports = router;
