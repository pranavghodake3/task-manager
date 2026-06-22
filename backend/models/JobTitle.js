'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JobTitle extends Model {
    static associate(_models) {
      // define association here
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