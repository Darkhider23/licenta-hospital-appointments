const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const { encrypt, decrypt } = require('../utils/crypto');
const Doctor = require('./Doctor')
const User = require('./User')
const { Op } = require('sequelize');

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  appointmentTime: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  startHour: {
    type: DataTypes.TIME,
    allowNull: true,
    validate: {
      async notOverlapping() {
        const overlappingAppointments = await Appointment.findAll({
          where: {
            userId :this.userId,
            doctorId: this.doctorId,
            appointmentTime: this.appointmentTime,
            [Op.or]: [
              {
                [Op.and]: [
                  {
                    startHour: {
                      [Op.lt]: this.endHour,
                    },
                  },
                  {
                    endHour: {
                      [Op.gt]: this.startHour,
                    },
                  },
                ],
              },
            ],
          },
        });
      
        if (overlappingAppointments.length > 0) {
          const overlappingHours = overlappingAppointments.map(appointment => {
            const overlappingStartHour = appointment.startHour > this.startHour ? appointment.startHour : this.startHour;
            const overlappingEndHour = appointment.endHour < this.endHour ? appointment.endHour : this.endHour;
            return `${overlappingStartHour} - ${overlappingEndHour}`;
          });
      
          throw new Error(`This appointment is overlapping with the following hour(s): ${overlappingHours.join(', ')}`);
        }
      }
      
    },
  },
  endHour: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
        model:'Doctor',
        key:'id',
    },
  },
  reasonForVisit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed','canceled'),
    allowNull: false,
    defaultValue: 'pending',
  },
}, {
  tableName: 'Appointments',
  timestamps: true,
  hooks:{
    beforeCreate: async(appointment) =>{
      try{
        const encryptedreason = await encrypt(appointment.reasonForVisit);
        appointment.reasonForVisit = encryptedreason;
      }catch(error){
        console.error('Error encrypting appointment data',error);
        throw error;
      }
    },
    afterFind: async(appointments)=>{
      if (!Array.isArray(appointments)) {
        // If `users` is not an array, assume it's a single user object
        try {
          appointments.reasonForVisit = await decrypt(appointments.reasonForVisit);
          
        } catch (error) {
          console.error('Error decrypting user data:', error);
          throw error;
        }
      } else {
        // If `users` is an array, loop through each user object and decrypt their attributes
        try {
          for (let i = 0; i < appointments.length; i++) {
            appointments[i].reasonForVisit = await decrypt(appointments[i].reasonForVisit);
            
          }
        } catch (error) {
          console.error('Error decrypting user data:', error);
          throw error;
        }
      }
    },
  }
});


module.exports = Appointment;