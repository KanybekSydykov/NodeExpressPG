const User = require('./User');
const UsersHistory = require('./UsersHistory');

User.hasMany(UsersHistory, { foreignKey: 'userId' });
UsersHistory.belongsTo(User, { foreignKey: 'userId' });
