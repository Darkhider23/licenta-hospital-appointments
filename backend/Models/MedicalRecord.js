const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const { encrypt, decrypt } = require('../utils/crypto');

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
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  diagnosis: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  treatment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'medicalrecords',
  hooks: {
    beforeCreate: async (user) => {
      try {
        const encryptedFirstname = await encrypt(user.firstname,user.email);
        const encryptedLastname = await encrypt(user.lastname,user.email);
        const encryptedPassword = await encrypt(user.password,user.email);
        const encryptedRole = await encrypt(user.role,user.email);

        user.firstname = encryptedFirstname;
        user.lastname = encryptedLastname;
        user.password = encryptedPassword;
        user.role = encryptedRole;
      } catch (error) {
        console.error('Error encrypting user data:', error);
        throw error;
      }
    },
    afterFind: async (users) => {
      if (!Array.isArray(users)) {
        // If `users` is not an array, assume it's a single user object
        try {
          
          users.firstname = await decrypt(users.firstname,users.email);
          users.lastname = await decrypt(users.lastname,users.email);
          users.password = await decrypt(users.password,users.email);
          users.role = await decrypt(users.role,users.email);
        } catch (error) {
          console.error('Error decrypting user data:', error);
          throw error;
        }
      } else {
        // If `users` is an array, loop through each user object and decrypt their attributes
        try {
          for (let i = 0; i < users.length; i++) {
            
            users[i].firstname = await decrypt(users[i].firstname,users[i].email);
            users[i].lastname = await decrypt(users[i].lastname,users[i].email);
            users[i].password = await decrypt(users[i].password,users[i].email);
            users[i].role = await decrypt(users[i].role,users[i].email);
          }
        } catch (error) {
          console.error('Error decrypting user data:', error);
          throw error;
        }
      }
    },
  },
});

module.exports = MedicalRecord;