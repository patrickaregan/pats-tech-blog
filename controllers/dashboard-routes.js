// Define global variables
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// Define default route
router.get('/', (req, res) => {
    Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'title',
        'content',
        'created_at'
      ],
      order: [['created_at', 'DESC']],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbData => {
        const posts = dbData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true, dashboard: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// Export variables
module.exports = router;