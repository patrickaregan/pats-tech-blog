// Define global variables
const router = require('express').Router();
const { Comment } = require('../../models');

// Define route to GET All Comments
router.get('/', (req, res) => {
  Comment.findAll()
    .then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Define route to CREATE a Comment
router.post('/', (req, res) => {
  // check the session
  //if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      // use the id from the session
      //user_id: req.session.user_id
      user_id: req.body.user_id
    })
      .then(dbData => res.json(dbData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  //}
});

// Define route to DELETE Comment
router.delete('/:id', (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbData => {
      if (!dbData) {
        res.status(404).json({ message: 'No Comment found with this id!' });
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