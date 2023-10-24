const { Sequelize } = require("sequelize");
const config = require("../config/config.json");
const { username, password, database, dialect, host } = config.development;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
});
sequelize
  .sync()
  .then(() => {
    console.log("Models synced with the database.");
  })
  .catch((error) => {
    console.error("Error syncing models:", error);
  });

module.exports = sequelize
