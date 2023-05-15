const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Specializations = sequelize.define('Specializations', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'specializations'
});

module.exports = Specializations;
