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
        type: DataTypes.TEXT,
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

Diseases.belongsTo(Specializations, { foreignKey: 'specializationsId' });

module.exports = Diseases;