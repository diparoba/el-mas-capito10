const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const EngineParameter = sequelize.define('EngineParameter', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    valor: { type: DataTypes.FLOAT, allowNull: false },
    unidad: { type: DataTypes.STRING, allowNull: false },
    timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    scanId: { type: DataTypes.INTEGER, allowNull: false }
  }, { tableName: 'EngineParameters', timestamps: false });

  EngineParameter.associate = (models) => {
    EngineParameter.belongsTo(models.Scan, { foreignKey: 'scanId', as: 'scan' });
  };

  return EngineParameter;
};
