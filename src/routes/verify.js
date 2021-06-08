const express = require('express');
const router = express.Router();
const { User } = require('../models/user');

// Query string is intentionally *not* validated for security purposes
router.get('/', [], async (req, res) => {
  // Look up 'user' in DB
  const user = await User.findOne({
    email: req.query.x,
  });
  if (!user)
    return res
      .status(400)
      .send({ message: 'Please check your activation link.' });
  // Check if activation code sent matches the one in 'user'
  if (user.codigoVerificador !== req.query.y)
    return res
      .status(400)
      .send({ message: 'Please check your activation link.' });
  // Check if 'user' has already been verified
  if (user.verificado)
    return res
      .status(400)
      .send({ message: 'The activation link is no longer valid.' });
  // Set verified property to 'true'
  user.verificado = true;
  // Save changes to DB
  await user.save();
  res.redirect('/verified.html');
});

module.exports = router;
