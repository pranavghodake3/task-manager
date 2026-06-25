'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectMember extends Model {
    static associate(models) {
      ProjectMember.belongsTo(models.Project, {
        foreignKey: 'projectId',
        as: 'project'
      });

      ProjectMember.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'role'
      });

      ProjectMember.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });

      ProjectMember.belongsTo(models.JobTitle, {
        foreignKey: 'jobTitleId',
        as: 'jobTitle'
      });
    }
  }
  ProjectMember.init({
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
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id'
      }
    },
    jobTitleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'jobTitles',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'ProjectMember',
    tableName: 'projectMembers',
    timestamps: true,
  });
  return ProjectMember;
};
