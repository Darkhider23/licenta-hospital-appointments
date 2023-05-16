const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const AnalysisPrice = sequelize.define('AnalysisPrice', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

module.exports = AnalysisPrice;
