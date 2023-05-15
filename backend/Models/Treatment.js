const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Diseases = require('./Diseases');

const Treatment = sequelize.define('Treatment', {
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
    diseasesId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Diseases,
            key: 'id',
        },
    },
});

Treatment.belongsTo(Diseases, { foreignKey: 'diseasesId' });

module.exports = Treatment;