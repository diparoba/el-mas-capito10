const { Sequelize } = require('sequelize');
const path = require('path');

// SQLite Code-First: Sequelize auto-creates tables from models
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'database.sqlite'),
  logging: false
});

// Import models
const User = require('./User')(sequelize);
const Vehicle = require('./Vehicle')(sequelize);
const Scan = require('./Scan')(sequelize);
const DiagnosticCode = require('./DiagnosticCode')(sequelize);
const EngineParameter = require('./EngineParameter')(sequelize);
const Report = require('./Report')(sequelize);

const models = { User, Vehicle, Scan, DiagnosticCode, EngineParameter, Report };

// Setup associations (Code-First relationships)
Object.values(models).forEach(model => {
  if (model.associate) model.associate(models);
});

module.exports = { sequelize, ...models };
