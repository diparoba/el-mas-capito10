const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Vehicle = sequelize.define('Vehicle', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    marca: { type: DataTypes.STRING, allowNull: false },
    modelo: { type: DataTypes.STRING, allowNull: false },
    anio: { type: DataTypes.INTEGER, allowNull: false },
    vin: { type: DataTypes.STRING(17), allowNull: false, unique: true },
    placa: { type: DataTypes.STRING, allowNull: false },
    tipoMotor: { type: DataTypes.STRING, allowNull: false },
    kilometraje: { type: DataTypes.INTEGER, defaultValue: 0 },
    userId: { type: DataTypes.INTEGER, allowNull: false }
  }, { tableName: 'Vehicles', timestamps: true });

  Vehicle.associate = (models) => {
    Vehicle.belongsTo(models.User, { foreignKey: 'userId', as: 'owner' });
    Vehicle.hasMany(models.Scan, { foreignKey: 'vehicleId', as: 'scans' });
  };

  return Vehicle;
};
