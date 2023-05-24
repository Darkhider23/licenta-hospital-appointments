const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Key = sequelize.define('Key', {
  publicKey: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Key;