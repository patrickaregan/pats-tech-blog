// Define global variables
const router = require('express').Router();
const { User } = require('../../models');

// Define route to GET All Users
router.get('/', (req, res) => {
    User.findAll({
      attributes: { exclude: ['password'] }
    })
      .then(dbData => res.json(dbData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// Define route to GET One User
router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    }
  })
    .then(dbData => {
      if (!dbData) {
        res.status(404).json({ message: 'No User found with this id.' });
        return;
      }
      res.json(dbData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Define route to CREATE User
router.post('/', (req, res) => {
  // expects {username: 'someusername', password: 'somepassword'}
  User.create({
    username: req.body.username,
    password: req.body.password
  })
    .then(dbData => {
      //req.session.save(() => {
        //req.session.user_id = dbData.id;
        //req.session.username = dbData.username;
        //req.session.loggedIn = true;
        res.json(dbData);
      //});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Define route to UPDATE User
router.put('/:id', (req, res) => {
  // expects {username: 'someusername', password: 'somepassword'}
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then(dbData => {
      if (!dbData[0]) {
        res.status(404).json({ message: 'No User found with this id.' });
        return;
      }
      res.json(dbData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Define route to DELETE User
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbData => {
      if (!dbData) {
        res.status(404).json({ message: 'No User found with this id.' });
        return;
      }
      res.json(dbData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Define route to Login
router.post('/login', (req, res) => {
  // expects {username: 'someusername', password: 'somepassword'}
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(dbData => {
    if (!dbData) {
      res.status(400).json({ message: 'No User with that username!' });
      return;
    }

    const passwordCheck = dbData.checkPW(req.body.password);

    if (!passwordCheck) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    //req.session.save(() => {
      //req.session.user_id = dbUserData.id;
      //req.session.username = dbUserData.username;
      //req.session.loggedIn = true;
  
      res.json({ user: dbData, message: 'You are logged in!' });
    //});
  });
});

// Define route to Logout
router.post('/logout', (req, res) => {
  //if (req.session.loggedIn) {
    //req.session.destroy(() => {
      res.status(204).end();
    //});
  //}
  //else {
    //res.status(404).end();
  //}
});

// Export variables
module.exports = router;
