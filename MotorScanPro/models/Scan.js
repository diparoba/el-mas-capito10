const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Scan = sequelize.define('Scan', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    estado: { type: DataTypes.ENUM('En Progreso', 'Completado', 'Requiere Atencion'), defaultValue: 'En Progreso' },
    notasTecnico: { type: DataTypes.TEXT, allowNull: true },
    estadoGeneral: { type: DataTypes.ENUM('Bueno', 'Regular', 'Critico'), defaultValue: 'Bueno' },
    vehicleId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false }
  }, { tableName: 'Scans', timestamps: true });

  Scan.associate = (models) => {
    Scan.belongsTo(models.Vehicle, { foreignKey: 'vehicleId', as: 'vehicle' });
    Scan.belongsTo(models.User, { foreignKey: 'userId', as: 'technician' });
    Scan.hasMany(models.DiagnosticCode, { foreignKey: 'scanId', as: 'codes' });
    Scan.hasMany(models.EngineParameter, { foreignKey: 'scanId', as: 'parameters' });
    Scan.hasOne(models.Report, { foreignKey: 'scanId', as: 'report' });
  };

  return Scan;
};
