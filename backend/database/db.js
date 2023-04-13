// database/db.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('your_db_name', 'your_db_username', 'your_db_password', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
