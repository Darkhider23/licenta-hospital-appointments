const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const { encrypt, decrypt } = require('../utils/crypto');

const User = sequelize.define('User', {
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,

  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,

  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,

  },
}, {
  tableName: 'users',
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

module.exports = User;
