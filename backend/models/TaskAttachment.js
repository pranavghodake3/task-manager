'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaskAttachment extends Model {
    static associate(models) {
      TaskAttachment.belongsTo(models.Task, {
        foreignKey: 'taskId',
        as: 'task'
      });
    }
  }
  TaskAttachment.init({
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
    fileName: {
      type: DataTypes.STRING
    },
    fileUrl: {
      type: DataTypes.TEXT
    },
  }, {
    sequelize,
    modelName: 'TaskAttachment',
    tableName: 'taskAttachments'
  });
  return TaskAttachment;
};
