'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
// Allow overriding DB config with environment variables (useful for Kubernetes)
config.host = process.env.DB_HOST || process.env.POSTGRES_HOST || config.host;
config.port = process.env.DB_PORT || process.env.POSTGRES_PORT || config.port;
config.username = process.env.POSTGRES_USER || process.env.DB_USER || config.username;
config.password = process.env.POSTGRES_PASSWORD || process.env.DB_PASSWORD || config.password;
config.database = process.env.POSTGRES_DB || process.env.DB_NAME || config.database;
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach((file) => {
    const modelFile = require(path.join(__dirname, file));
    const model =
      typeof modelFile === 'function' ? modelFile(sequelize, Sequelize.DataTypes) : modelFile;
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
