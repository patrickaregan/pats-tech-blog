// Define global variables
const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// Define route to GET All Posts
router.get('/', (req, res) => {
    Post.findAll({
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
          order: [['created_at', 'DESC']],
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
      .then(dbData => res.json(dbData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});
  
// Define route to GET One Post
router.get('/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
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
        if (!dbData) {
          res.status(404).json({ message: 'No Post found with this id.' });
          return;
        }
        res.json(dbData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});
  
// Define route to CREATE Post
router.post('/', (req, res) => {
    // expects {title: 'sometitle', content: 'somecontent', user_id: 1}
    Post.create({
      title: req.body.title,
      content: req.body.content,
      //user_id: req.session.user_id
      user_id: req.body.user_id
    })
      .then(dbData => res.json(dbData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});
  
// Define route to UPDATE Post
router.put('/:id', (req, res) => {
    Post.update(
      {
        title: req.body.title,
        content: req.body.content
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbData => {
        if (!dbData) {
          res.status(404).json({ message: 'No Post found with this id.' });
          return;
        }
        res.json(dbData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});
  
// Define route to DELETE Post
router.delete('/:id', (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbData => {
        if (!dbData) {
          res.status(404).json({ message: 'No Post found with this id.' });
          return;
        }
        res.json(dbData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// Export variables
module.exports = router;