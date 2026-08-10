'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Role,
        {
          through: models.ProjectMember,
          foreignKey: 'userId',
          otherKey: 'roleId',
          as: 'roles'
        }
      );
      User.belongsToMany(models.Project,
        {
          through: models.ProjectMember,
          foreignKey: 'userId',
          otherKey: 'projectId',
          as: 'projects'
        }
      );

      User.belongsTo(models.Company, {
        foreignKey: 'companyId',
        as: 'company'
      });

      User.belongsTo(models.GlobalRole, {
        foreignKey: 'globalRoleId',
        as: 'globalRole'
      });

      User.hasMany(models.ProjectMember, {
        foreignKey: 'userId',
        as: 'projectMembership'
      });
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    companyId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'companies',
        key: 'id'
      }
    },
    globalRoleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'globalRoles',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return User;
};
