const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const bcrypt = require('bcrypt');

module.exports = (sequelize,DataTypes) =>{
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
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
});

User.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

return User;
}
