const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Diagnoses = sequelize.define('Diagnoses', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Diagnoses;
