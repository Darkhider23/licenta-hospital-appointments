const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

module.exports = (sequelize,DataTypes) =>{
const Doctor = sequelize.define('Doctor', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specialization: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  tableName: 'doctor', // Optional, set the table name explicitly
});
return Doctor;
}
