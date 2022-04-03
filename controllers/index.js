// Define global variables
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
//const dashboardRoutes = require('./dashboard-routes.js');

// Use middleware
router.use('/api', apiRoutes);
router.use('/', homeRoutes);
//router.use('/dashboard', dashboardRoutes);
router.use((req, res) => {
  res.status(404).end();
});

// Export variables
module.exports = router;
