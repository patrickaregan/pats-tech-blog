// Require dependencies
const Sequelize = require('sequelize');
require('dotenv').config();

// Declare variables
let sequelize;

// Create db connection
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  });
}

// Export varibles
module.exports = sequelize;
