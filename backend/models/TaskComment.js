'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaskComment extends Model {
    static associate(models) {
      TaskComment.belongsTo(models.Task, {
        foreignKey: 'taskId',
        as: 'task'
      });

      TaskComment.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }
  TaskComment.init({
     taskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tasks', // Target table name
        key: 'id',       // Target column name
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // Target table name
        key: 'id',       // Target column name
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    comment: {
      type: DataTypes.TEXT
    },
  }, {
    sequelize,
    modelName: 'TaskComment',
    tableName: 'taskComments'
  });
  return TaskComment;
};
