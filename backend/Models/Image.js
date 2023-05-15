const { DataTypes } = require('sequelize');
const sequelize = require('../database/db'); 
const { encrypt, decrypt } = require('../utils/crypto');

const Image = sequelize.define('Image', {
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true,
    set(value) {
      const encryptedData = encrypt(value);
      this.setDataValue('filename', encryptedData);
    },
    get() {
      const encryptedData = this.getDataValue('filename');
      return decrypt(encryptedData);
    },
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      const encryptedData = encrypt(value);
      this.setDataValue('url', encryptedData);
    },
    get() {
      const encryptedData = this.getDataValue('url');
      return decrypt(encryptedData);
    },
  },
  extension: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      const encryptedData = encrypt(value);
      this.setDataValue('extension', encryptedData);
    },
    get() {
      const encryptedData = this.getDataValue('extension');
      return decrypt(encryptedData);
    },
  },
});

module.exports = Image;
