const { DataTypes } = require('sequelize');
const { sequelize } = require('./sequelize');

const CompanyModel = sequelize.define(
  'Company',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'companies',
    timestamps: true,
  },
);

module.exports = CompanyModel;
