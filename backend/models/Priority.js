'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Priority extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Priority.hasMany(models.Task, {
        foreignKey: 'priorityId',
      });
    }
  }
  Priority.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rank: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Priority',
    tableName: 'priorities',
    timestamps: false
  });
  return Priority;
};
