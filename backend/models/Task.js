'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      Task.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });

      Task.belongsTo(models.User, {
        foreignKey: 'creatorId',
        as: 'creator'
      });

      Task.belongsTo(models.Status, {
        foreignKey: 'statusId',
        as: 'status'
      });

      Task.belongsTo(models.Priority, {
        foreignKey: 'priorityId',
        as: 'priority'
      });

      Task.belongsTo(models.Project, {
        foreignKey: 'projectId',
        as: 'project'
      });

      Task.belongsTo(models.Company, {
        foreignKey: 'companyId',
        as: 'company'
      });
      
    }
  }
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    storyPoints:{
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users', // Target table name
        key: 'id',       // Target column name
      },
    },
    creatorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // Target table name
        key: 'id',       // Target column name
      },
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'statuses', // Target table name
        key: 'id',       // Target column name
      },
    },
    priorityId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'priorities', // Target table name
        key: 'id',       // Target column name
      },
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'projects', // Target table name
        key: 'id',       // Target column name
      },
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'companies', // Target table name
        key: 'id',       // Target column name
      },
    }
  }, {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    timestamps: true,
  });
  return Task;
};
