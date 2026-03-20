const express = require('express');
const router = express.Router();
const { Vehicle, Scan, DiagnosticCode, User } = require('../models');
const { authMiddleware } = require('../services/auth');

// GET /api/vehicles - List all vehicles
router.get('/', async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll({
      include: [
        { model: User, as: 'owner', attributes: ['nombre'] },
        { model: Scan, as: 'scans', attributes: ['id', 'fecha', 'estado', 'estadoGeneral'] }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/vehicles/:id
router.get('/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id, {
      include: [
        { model: User, as: 'owner', attributes: ['nombre', 'nombreTaller'] },
        {
          model: Scan, as: 'scans',
          include: [
            { model: DiagnosticCode, as: 'codes' },
            { model: User, as: 'technician', attributes: ['nombre'] }
          ],
          order: [['fecha', 'DESC']]
        }
      ]
    });
    if (!vehicle) return res.status(404).json({ error: 'Vehículo no encontrado' });
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/vehicles
router.post('/', authMiddleware, async (req, res) => {
  try {
    const vehicle = await Vehicle.create({ ...req.body, userId: req.user.id });
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/vehicles/:id
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    if (!vehicle) return res.status(404).json({ error: 'Vehículo no encontrado' });
    await vehicle.update(req.body);
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/vehicles/:id
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    if (!vehicle) return res.status(404).json({ error: 'Vehículo no encontrado' });
    await vehicle.destroy();
    res.json({ message: 'Vehículo eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
