const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Specializations = require('./Specializations');

const Diseases = sequelize.define('Diseases', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    treatment: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    specializationsId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Specializations,
            key: 'id',
        },
    },
});

Diseases.belongsTo(Specializations, { foreignKey: 'symptomsId' });

module.exports = Diseases;