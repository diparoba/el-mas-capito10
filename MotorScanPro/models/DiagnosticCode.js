const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const DiagnosticCode = sequelize.define('DiagnosticCode', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    codigo: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.STRING, allowNull: false },
    sistema: { type: DataTypes.ENUM('Motor', 'Transmision', 'Chasis', 'Red/Comunicacion'), allowNull: false },
    severidad: { type: DataTypes.ENUM('Critico', 'Advertencia', 'Informativo'), allowNull: false },
    scanId: { type: DataTypes.INTEGER, allowNull: false }
  }, { tableName: 'DiagnosticCodes', timestamps: false });

  DiagnosticCode.associate = (models) => {
    DiagnosticCode.belongsTo(models.Scan, { foreignKey: 'scanId', as: 'scan' });
  };

  return DiagnosticCode;
};
