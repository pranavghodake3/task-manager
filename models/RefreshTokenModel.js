const { DataTypes } = require('sequelize');
const { sequelize } = require('./sequelize');

const RefreshTokenModel = sequelize.define(
  'RefreshToken',
  {
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'refresh_tokens',
    timestamps: true,
  },
);

module.exports = RefreshTokenModel;
