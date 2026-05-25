const { DataTypes } = require('sequelize');
const { sequelize } = require('./sequelize');

const RoleModel = sequelize.define(
  'Role',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: 'roles',
    timestamps: true,
  },
);

module.exports = RoleModel;
