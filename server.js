// Define global variables
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3001;

// Use middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// Start the application
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});