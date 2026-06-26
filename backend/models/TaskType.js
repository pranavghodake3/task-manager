'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaskType extends Model {
    static associate(models) {
      TaskType.hasMany(models.Task, {
        foreignKey: 'taskTypeId',
        as: 'tasks'
      });
    }
  }
  TaskType.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TaskType',
    tableName: 'taskTypes',
    timestamps: false
  });
  return TaskType;
};