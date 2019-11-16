const router = require("express").Router();
const uploadCloud = require("../config/uploadCloud");
const User = require('../models/User');

router.post('/profile-picture', uploadCloud.single('picture'), async (req, res, next) => {
    try {
      await User.findByIdAndUpdate(req.session.user._id, {profilePicture: req.file.url})
      res.status(200).json({profilePicture: req.file.url})
    } catch(error) {
      res.status(500).json({error})
    }
});

module.exports = router