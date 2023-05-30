const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const MedicalRecord = sequelize.define('MedicalRecord', {
    medicalRecordId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    diagnosis: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName : 'medicalrecords'
  });
  
  module.exports = MedicalRecord;