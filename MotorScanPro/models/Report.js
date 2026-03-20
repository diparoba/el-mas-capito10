const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Report = sequelize.define('Report', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    fechaGeneracion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    recomendaciones: { type: DataTypes.TEXT, allowNull: true },
    scanId: { type: DataTypes.INTEGER, allowNull: false, unique: true }
  }, { tableName: 'Reports', timestamps: false });

  Report.associate = (models) => {
    Report.belongsTo(models.Scan, { foreignKey: 'scanId', as: 'scan' });
  };

  return Report;
};
