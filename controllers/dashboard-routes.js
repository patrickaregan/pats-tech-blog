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

// Define new post route
router.get('/newpost', (req, res) => {
  res.render('new-post', { loggedIn: true, dashboard: true });
});

// Define edit post route
router.get('/editpost/:id', (req, res) => {
  Post.findByPk(req.params.id, {
    attributes: [
      'id',
      'title',
      'content',
      'created_at'
    ],
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
      if (dbData) {
        const post = dbData.get({ plain: true });
        
        res.render('edit-post', {
          post,
          loggedIn: true,
          dashboard: true
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// Export variables
module.exports = router;