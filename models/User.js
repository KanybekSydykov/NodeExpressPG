const {DataTypes} = require('sequelize')
const sequelize = require('../db/db.js');
const UsersHistory = require('./UsersHistory.js')

const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
    }
  });

  (async () => {
    try {
      await sequelize.sync(); 
      console.log('User model synchronized successfully.');
    } catch (error) {
      console.error('Error synchronizing User model:', error);
    }
  })();

  User.hasMany(UsersHistory, {
    foreignKey: 'userId', 
  });

 // User.js
User.addHook('afterCreate', async (user, options) => {
  await UsersHistory.create({
    action: 'User Created',
    userId: user.id,
    user: `${user.firstName} ${user.lastName}`
  });
});

User.addHook('afterUpdate', async (user, options) => {
  await UsersHistory.create({
    action: 'User Updated',
    userId: user.id,
    user: `${user.firstName} ${user.lastName}`
  });
});
  
  module.exports = User;