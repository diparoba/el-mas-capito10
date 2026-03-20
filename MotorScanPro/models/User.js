const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    rol: { type: DataTypes.ENUM('Administrador', 'Tecnico'), defaultValue: 'Tecnico' },
    nombreTaller: { type: DataTypes.STRING, allowNull: true }
  }, { tableName: 'Users', timestamps: true });

  User.associate = (models) => {
    User.hasMany(models.Vehicle, { foreignKey: 'userId', as: 'vehicles' });
    User.hasMany(models.Scan, { foreignKey: 'userId', as: 'scans' });
  };

  return User;
};
