const express = require('express');
const router = express.Router();
const { Scan, Vehicle, DiagnosticCode, EngineParameter, Report, User } = require('../models');
const { authMiddleware } = require('../services/auth');

// GET /api/scans - List all scans
router.get('/', async (req, res) => {
  try {
    const scans = await Scan.findAll({
      include: [
        { model: Vehicle, as: 'vehicle', attributes: ['marca', 'modelo', 'anio', 'placa'] },
        { model: User, as: 'technician', attributes: ['nombre'] },
        { model: DiagnosticCode, as: 'codes' }
      ],
      order: [['fecha', 'DESC']]
    });
    res.json(scans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/scans/:id - Full scan detail
router.get('/:id', async (req, res) => {
  try {
    const scan = await Scan.findByPk(req.params.id, {
      include: [
        { model: Vehicle, as: 'vehicle', include: [{ model: User, as: 'owner', attributes: ['nombre', 'nombreTaller'] }] },
        { model: User, as: 'technician', attributes: ['nombre'] },
        { model: DiagnosticCode, as: 'codes' },
        { model: EngineParameter, as: 'parameters' },
        { model: Report, as: 'report' }
      ]
    });
    if (!scan) return res.status(404).json({ error: 'Escaneo no encontrado' });
    res.json(scan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/scans
router.post('/', authMiddleware, async (req, res) => {
  try {
    const scan = await Scan.create({ ...req.body, userId: req.user.id });
    res.status(201).json(scan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/scans/:id
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const scan = await Scan.findByPk(req.params.id);
    if (!scan) return res.status(404).json({ error: 'Escaneo no encontrado' });
    await scan.update(req.body);
    res.json(scan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/scans/:id/codes - Add DTC code to scan
router.post('/:id/codes', authMiddleware, async (req, res) => {
  try {
    const code = await DiagnosticCode.create({ ...req.body, scanId: req.params.id });
    res.status(201).json(code);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/scans/:id/parameters - Add engine parameter
router.post('/:id/parameters', authMiddleware, async (req, res) => {
  try {
    const param = await EngineParameter.create({ ...req.body, scanId: req.params.id });
    res.status(201).json(param);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/scans/:id/report - Generate report
router.post('/:id/report', authMiddleware, async (req, res) => {
  try {
    const existing = await Report.findOne({ where: { scanId: req.params.id } });
    if (existing) {
      await existing.update(req.body);
      return res.json(existing);
    }
    const report = await Report.create({ ...req.body, scanId: req.params.id });
    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
