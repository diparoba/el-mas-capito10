const express = require('express');
const router = express.Router();
const { Sequelize } = require('sequelize');
const { Scan, Vehicle, DiagnosticCode, EngineParameter, User } = require('../models');

// GET /api/dashboard - Stats & recent activity
router.get('/', async (req, res) => {
  try {
    const totalScans = await Scan.count();
    const totalVehicles = await Vehicle.count();
    const totalCodes = await DiagnosticCode.count();

    const statusCounts = await Scan.findAll({
      attributes: ['estadoGeneral', [Sequelize.fn('COUNT', '*'), 'count']],
      group: ['estadoGeneral']
    });

    const scanStatusCounts = await Scan.findAll({
      attributes: ['estado', [Sequelize.fn('COUNT', '*'), 'count']],
      group: ['estado']
    });

    const topCodes = await DiagnosticCode.findAll({
      attributes: ['codigo', 'descripcion', 'severidad', [Sequelize.fn('COUNT', '*'), 'count']],
      group: ['codigo', 'descripcion', 'severidad'],
      order: [[Sequelize.fn('COUNT', '*'), 'DESC']],
      limit: 5
    });

    const recentScans = await Scan.findAll({
      include: [
        { model: Vehicle, as: 'vehicle', attributes: ['marca', 'modelo', 'anio', 'placa'] },
        { model: User, as: 'technician', attributes: ['nombre'] },
        { model: DiagnosticCode, as: 'codes', attributes: ['codigo', 'severidad'] }
      ],
      order: [['fecha', 'DESC']],
      limit: 5
    });

    const criticalVehicles = await Scan.findAll({
      where: { estadoGeneral: 'Critico' },
      include: [
        { model: Vehicle, as: 'vehicle', attributes: ['marca', 'modelo', 'anio', 'placa'] },
        { model: DiagnosticCode, as: 'codes', attributes: ['codigo', 'severidad'] }
      ],
      order: [['fecha', 'DESC']],
      limit: 5
    });

    const systemDist = await DiagnosticCode.findAll({
      attributes: ['sistema', [Sequelize.fn('COUNT', '*'), 'count']],
      group: ['sistema']
    });

    const severityDist = await DiagnosticCode.findAll({
      attributes: ['severidad', [Sequelize.fn('COUNT', '*'), 'count']],
      group: ['severidad']
    });

    res.json({
      stats: { totalScans, totalVehicles, totalCodes },
      statusCounts,
      scanStatusCounts,
      topCodes,
      recentScans,
      criticalVehicles,
      systemDist,
      severityDist
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
