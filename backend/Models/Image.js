const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const { encrypt, decrypt } = require('../utils/crypto');

const Image = sequelize.define('Image', {
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  extension: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'images',
  hooks: {
    beforeCreate: async (image) => {
      try {
        // const encryptedFileName = await encrypt(image.filename);
        const encryptedUrl = await encrypt(image.url,image.filename);
        const encryptedExternsion = await encrypt(image.extension,image.filename);

        image.url = encryptedUrl;
        image.extension = encryptedExternsion;
      } catch (error) {
        console.error('Error encrypting user data:', error);
        throw error;
      }
    },
    afterFind: async (image) => {
      try {
        // image.firstname = await decrypt(image.filename);
        image.url = await decrypt(image.url,image.filename);
        image.extension = await decrypt(image.extension,image.filename);
      } catch (error) {
        console.error('Error decrypting user data:', error);
        throw error;
      }
    },
  },
});

module.exports = Image;
