'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Status.hasMany(models.Task, {
        foreignKey: 'statusId',
      });
    }
  }
  Status.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING
    },
    displayOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isClosed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'Status',
    tableName: 'statuses',
    timestamps: false,
  });
  return Status;
};