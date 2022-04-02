// Define global variables
const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes');

// Use middleware
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

// Export variables
module.exports = router;
