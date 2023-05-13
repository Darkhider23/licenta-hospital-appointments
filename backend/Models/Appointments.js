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
        const schedules = await Appointment.findAll({
          where: {
            [Op.and]: [
              { appointmentTime: this.appointmentTime },
              { doctorId: this.doctorId },
              {
                [Op.or]: [
                  {
                    startHour: {
                      [Op.lte]: this.startHour,
                    },
                    endHour: {
                      [Op.gte]: this.startHour,
                    },
                  },
                  {
                    startHour: {
                      [Op.gte]: this.startHour,
                    },
                    endHour: {
                      [Op.lte]: this.endHour,
                    },
                  },
                  {
                    startHour: {
                      [Op.lte]: this.endHour,
                    },
                    endHour: {
                      [Op.gte]: this.endHour,
                    },
                  },
                ],
              },
            ],
          },
        });

        if (schedules.length > 0) {
          throw new Error('This appointment is overlapping with an existing appointment.');
        }
      },
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
    type: DataTypes.ENUM('pending', 'confirmed'),
    allowNull: false,
    defaultValue: 'scheduled',
  },
}, {
  tableName: 'Appointments',
  timestamps: true,
});
Appointment.belongsTo(User,{onDelete:'CASCADE'});
Appointment.belongsTo(Doctor,{onDelete:'CASCADE'});


module.exports = Appointment;