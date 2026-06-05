'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProject extends Model {
    static associate(models) {
      // define association here
    }
  }
  UserProject.init({
    user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    project: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'UserProject',
    tableName: 'user_projects',
    timestamps: true,
  });
  return UserProject;
};
