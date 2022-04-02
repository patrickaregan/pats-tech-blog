// Define global variables
const router = require('express').Router();
const userRoutes = require('./user-routes.js');

// Use middleware
router.use('/users', userRoutes);

// Export variables
module.exports = router;
