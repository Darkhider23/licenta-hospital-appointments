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
    set(value) {
        const encryptedData= encrypt(value);
        this.setDataValue('reasonForVisit', encryptedData);
      },
      get() {
        const encryptedData = this.getDataValue('reasonForVisit');
        return decrypt(encryptedData);
      },
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed','canceled'),
    allowNull: false,
    defaultValue: 'pending',
  },
}, {
  tableName: 'Appointments',
  timestamps: true,
});


module.exports = Appointment;