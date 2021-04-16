const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Query string is intentionally *not* validated for security purposes
router.get('/', [], async (req, res) => {
  // Look up user
  const user = await User.findOne({
    email: req.query.x,
  });
  if (!user)
    return res
      .status(400)
      .send({ message: 'Please check your activation link.' });
  // Check if activation code sent, matches the one in 'user'
  if (user.verificationCode !== req.query.y)
    return res
      .status(400)
      .send({ message: 'Please check your activation link.' });
  // Check if user has already been verified
  if (user.isVerified)
    return res
      .status(400)
      .send({ message: 'The activation link is no longer valid.' });
  // Set verified property to 'true'
  user.isVerified = true;
  // Save to DB
  await user.save();
  res.send({ message: 'Your account has been activated. You may now log in.' });
});

module.exports = router;
