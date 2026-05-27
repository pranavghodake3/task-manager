const { DataTypes } = require('sequelize');
const { sequelize } = require('./sequelize');

const ProjectModel = sequelize.define(
  'Project',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'projects',
    timestamps: true,
  },
);

module.exports = ProjectModel;
