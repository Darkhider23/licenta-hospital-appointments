const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Key = sequelize.define('Key', {
  keyword:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  publicKey: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  privateKey:{
    type:DataTypes.TEXT,
    allowNull:false,
  },
},{
  tableName:'keys'
});

module.exports = Key;