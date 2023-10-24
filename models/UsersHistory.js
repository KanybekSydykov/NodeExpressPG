const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const UsersHistory = sequelize.define('UsersHistory', {
  action: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER, 
    allowNull: false
  },
  user: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = UsersHistory;
