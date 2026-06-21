'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompanyMember extends Model {
    static associate(models) {
      CompanyMember.belongsTo(models.Company, {
        foreignKey: 'companyId',
        as: 'company',
      });

      CompanyMember.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });

      CompanyMember.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'role'
      });

      CompanyMember.belongsTo(models.JobTitle, {
        foreignKey: 'jobTitleId',
        as: 'jobTitle'
      });
    }
  }
  CompanyMember.init({
    companyId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'companies',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'roles',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    jobTitleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'jobTitles',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  }, {
    sequelize,
    modelName: 'CompanyMember',
  });
  return CompanyMember;
};