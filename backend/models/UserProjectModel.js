'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProject extends Model {
    static associate(models) {
      UserProject.belongsTo(models.User, {
        foreignKey: 'userId',
        // as: 'roleInfo',
      });

      UserProject.belongsTo(models.Project, {
        foreignKey: 'projectId',
        // as: 'company'
      })
    }
  }
  UserProject.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'projects',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'UserProject',
    tableName: 'user_projects',
    timestamps: true,
  });
  return UserProject;
};
