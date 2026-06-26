'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GlobalRole extends Model {
    static associate(_models) {
      // define association here
    }
  }
  GlobalRole.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'GlobalRole',
    tableName: 'globalRoles',
    timestamps: false
  });
  return GlobalRole;
};