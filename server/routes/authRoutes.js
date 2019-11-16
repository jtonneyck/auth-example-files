const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const getUserWithOutPassword = require('./utils/userProjection');

router.post('/register', async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: 'Please provide credentials' });
    return false;
  }

  try {
    //encrpt password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await User.create({ username, password: hashedPassword });
    const userProj = getUserWithOutPassword(user._doc);
    req.session.user = userProj;
    res.status(200).json(userProj);
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
    const isPassword = await bcrypt.compare(password, user.password);
    if (user && isPassword) {
      const userProj = getUserWithOutPassword(user._doc);
      req.session.user = userProj;
      debugger
      res.status(200).json(userProj);
    } else {
      res
        .status(400)
        .json({ message: 'Please provide the correct credentials' });
    }
  } catch (err) {
    console.log(err);
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
