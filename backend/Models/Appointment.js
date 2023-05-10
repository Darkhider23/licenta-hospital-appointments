const { DataTypes } = require('sequelize');
const sequelize = require('../database/db')
const { encrypt, decrypt } = require('../utils/crypto');
const Doctor = require('../Models/Doctor')
const User = require('../Models/User')

const Appointment = sequelize.define('Appointment', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        set(value) {
          const encryptedData= encrypt(value);
          this.setDataValue('name', encryptedData);
        },
        get() {
          const encryptedData = this.getDataValue('name');
          return decrypt(encryptedData);
        },
      },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    hour: {
      type: DataTypes.TIME,
      allowNull: false
    },
    userid:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    doctorid:{
      type:DataTypes.INTEGER,
      allowNull:false,
    }
  },{
    tableName:'appointments'
  });
  Appointment.belongsTo(User,{onDelete:'CASCADE'});
  Appointment.belongsTo(Doctor,{onDelete:'CASCADE'});

  module.exports = Appointment;