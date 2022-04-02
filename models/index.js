// Define global variables
const User = require('./User');
const Post = require('./Post');

// Create associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});
  
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

// Export variables
module.exports = { User, Post };
