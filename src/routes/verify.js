const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', [], async (req, res) => {
  console.log(process.env.BASE_URL);
  // Query string is intentionally not validated
  // Look up user
  const user = await User.findOne({
    'email.address': req.query.x,
  });
  if (!user)
    return res
      .status(404)
      .send({ message: 'Please check your activation link.' });

  res.send(user);
});

module.exports = router;
