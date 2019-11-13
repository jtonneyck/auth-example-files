const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: 'Please provide credentials' });
    return false;
  }

  try {
    //encrpt password
    const newUser = await User.create(req.body);
    // dont send password back
    res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Wops something went terribly awry!' });
  }
});

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: 'Please provide credentials' });
    return false;
  }

  try {
    const user = await User.findOne({ username });
    if (user && user.password === password) {
      req.session.user = user;
      res.status(200).json(user);
    } else {
      res
        .status(400)
        .json({ message: 'Please provide the correct credentials' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Wops something went terribly awry!' });
  }
});

router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.status(200).json({ message: 'User is logged out' });
});

router.get('/isLoggedIn', (req, res, next) => {
  if (req.session.user) {
    res.status(200).json(req.session.user);
  } else {
    res.status(401).json({ message: 'Get outta here' });
  }
});

module.exports = router;
