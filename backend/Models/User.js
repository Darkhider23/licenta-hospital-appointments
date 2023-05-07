const { DataTypes } = require('sequelize');
const sequelize = require('../database/db')
const { encrypt, decrypt } = require('../utils/crypto');

const User = sequelize.define('User', {
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    set(value) {
      const encryptedData = encrypt(value);
      this.setDataValue('firstname', encryptedData);
      console.log(this.firstname);
    },
    get() {
      const encryptedData = this.getDataValue('firstname');
      return decrypt(encryptedData);
    },
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    set(value) {
      const encryptedData= encrypt(value);
      this.setDataValue('lastname', encryptedData);
    },
    get() {
      const encryptedData = this.getDataValue('lastname');
      return decrypt(encryptedData);
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      const encryptedData = encrypt(value);
      this.setDataValue('password', encryptedData);
    },
    get() {
      const encryptedData = this.getDataValue('password');
      return decrypt(encryptedData);
    },
  }
},{
  tableName:'users'
});

module.exports = User;
