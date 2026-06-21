'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job_Title extends Model {
    static associate(_models) {
      // define association here
    }
  }
  Job_Title.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Job_Title',
    tableName: 'jobTitles',
    timestamps: false
  });
  return Job_Title;
};