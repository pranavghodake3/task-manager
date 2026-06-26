'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JobTitle extends Model {
    static associate(models) {
      JobTitle.hasMany(models.ProjectMember, {
        foreignKey: 'jobTitleId',
        as: 'projectMembers'
      });
    }
  }
  JobTitle.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'JobTitle',
    tableName: 'jobTitles',
    timestamps: false
  });
  return JobTitle;
};
