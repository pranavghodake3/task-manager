'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectMember extends Model {
    static associate(models) {
      ProjectMember.belongsTo(models.CompanyMember, {
        foreignKey: 'companyMemberId',
        as: 'companyMember',
      });

      ProjectMember.belongsTo(models.Project, {
        foreignKey: 'projectId',
        as: 'project'
      })
    }
  }
  ProjectMember.init({
    companyMemberId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'companyMembers',
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
    modelName: 'ProjectMember',
    tableName: 'projectMembers',
    timestamps: true,
  });
  return ProjectMember;
};
