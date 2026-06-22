'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaskComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TaskComment.belongsTo(models.Task, {
        foreignKey: 'taskId',
        as: 'task'
      });

      TaskComment.belongsTo(models.CompanyMember, {
        foreignKey: 'companyMemberId',
        as: 'companyMember'
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
    companyMemberId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'companyMembers', // Target table name
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
