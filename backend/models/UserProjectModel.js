const { DataTypes } = require('sequelize');
const { sequelize } = require('./sequelize');

const UserProjectModel = sequelize.define(
  'UserProject',
  {
    user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    project: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'user_projects',
    timestamps: true,
  },
);

module.exports = UserProjectModel;
