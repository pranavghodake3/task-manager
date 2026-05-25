const { DataTypes } = require('sequelize');
const { sequelize } = require('./sequelize');

const RoleModel = sequelize.define(
  'Role',
  {
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
