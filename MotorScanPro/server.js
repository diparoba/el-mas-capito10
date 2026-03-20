const express = require('express');
const cors = require('cors');
const path = require('path');
const { sequelize } = require('./models');
const seedDatabase = require('./data/seed');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/auth', require('./controllers/auth'));
app.use('/api/vehicles', require('./controllers/vehicles'));
app.use('/api/scans', require('./controllers/scans'));
app.use('/api/dashboard', require('./controllers/dashboard'));

// SPA fallback — serve index.html for non-API routes
app.get('/{*path}', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
});

// Code-First: Sync models to database (creates tables automatically)
async function start() {
  try {
    await sequelize.sync({ force: false }); // Code-First: auto-create tables from models
    console.log('📦 Database synced (Code-First)');

    const models = require('./models');
    await seedDatabase(models);

    app.listen(PORT, () => {
      console.log(`🚀 MotorScan Pro running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start:', err);
  }
}

start();
