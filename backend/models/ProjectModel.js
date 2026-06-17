'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      Project.belongsTo(models.Company, {
        foreignKey: 'companyId',
        // as: 'company'
      })
    }
  }
  Project.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'companies',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Project',
    tableName: 'projects',
    timestamps: true,
  });
  return Project;
};
