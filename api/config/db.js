const { config } = require('dotenv');
const { Sequelize } = require('sequelize');
require('dotenv').config()

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});

module.exports = sequelize;