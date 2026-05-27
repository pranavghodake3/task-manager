const { DataTypes } = require('sequelize');
const { sequelize } = require('./sequelize');

const TaskModel = sequelize.define(
  'Task',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: 'tasks',
    timestamps: true,
  },
);

module.exports = TaskModel;
