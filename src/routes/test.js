const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const getUserInfo = require('../utils/getUserInfo');

router.get('/', [auth], async (req, res) => {
  // Verify user login
  // const user = await getUserInfo(req, res);
  // // Return user email (if it exists), otherwise return 'unauthorized'
  // if (!user) return res.status(400).send({ error: 'Please log in.' });
  // res.send(user);

  res.send({ message: 'Congrats! You are logged in.' });
});

module.exports = router;
