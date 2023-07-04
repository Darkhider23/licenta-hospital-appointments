const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const { encrypt, decrypt } = require('../utils/crypto');
const Specializations = require('../Models/Specializations');

const Doctor = sequelize.define('Doctor', {
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
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false,
    unique: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specializationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Specializations,
      key: 'id',
    },
  },
}, {
  tableName: 'doctor',
  hooks: {
    beforeCreate: async (doctor) => {
      try {
        const encryptedFirstname = await encrypt(doctor.firstname,doctor.email);
        const encryptedLastname = await encrypt(doctor.lastnamedoctor.email);
        const encryptedPassword = await encrypt(doctor.passworddoctor.email);
        const encryptedRole = await encrypt(doctor.roledoctor.email);

        doctor.firstname = encryptedFirstname;
        doctor.lastname = encryptedLastname;
        doctor.password = encryptedPassword;
        doctor.role = encryptedRole;
      } catch (error) {
        console.error('Error encrypting doctor data:', error);
        throw error;
      }
    },
    afterFind: async (doctors) => {
      if (!Array.isArray(doctors)) {
        // If `users` is not an array, assume it's a single user object
        try {
          console.log();
          doctors.firstname = await decrypt(doctors.firstname,doctors.email);
          doctors.lastname = await decrypt(doctors.lastname,doctors.email);
          doctors.password = await decrypt(doctors.password,doctors.email);
          doctors.role = await decrypt(doctors.role,doctors.email);
        } catch (error) {
          console.error('Error decrypting user data:', error);
          throw error;
        }
      } else {
        // If `users` is an array, loop through each user object and decrypt their attributes
        try {
          for (let i = 0; i < doctors.length; i++) {
            doctors[i].firstname = await decrypt(doctors[i].firstname,doctors[i].email);
            doctors[i].lastname = await decrypt(doctors[i].lastname,doctors[i].email);
            doctors[i].password = await decrypt(doctors[i].password,doctors[i].email);
            doctors[i].role = await decrypt(doctors[i].role,doctors[i].email);
          }
        } catch (error) {
          console.error('Error decrypting user data:', error);
          throw error;
        }
      }
    },
  },
});
Doctor.belongsTo(Specializations, { foreignKey: 'specializationId' });
module.exports = Doctor;
