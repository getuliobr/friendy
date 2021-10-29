const Sequelize = require('sequelize');
const databaseConfig = require('../config/db');
const sequelize = new Sequelize(databaseConfig);

module.exports = sequelize