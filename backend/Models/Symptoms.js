const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Diseases = require('./Diseases');

const Symptoms = sequelize.define('Symptoms', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  diseaseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: Diseases,
        key: 'id',
    },
},
});

Symptoms.belongsTo(Diseases, { foreignKey: 'diseaseId' });

module.exports = Symptoms;