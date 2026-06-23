'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate(models) {
      Company.hasMany(models.Project, {
        foreignKey: 'companyId',
        as: 'projects',
      });
      Company.belongsToMany(models.User, {
        through: models.CompanyMember,
        foreignKey: 'companyId',
        otherKey: 'userId',
        as: 'users'
      });
    }
  }
  Company.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Company',
    tableName: 'companies',
    timestamps: true,
  });
  return Company;
};
