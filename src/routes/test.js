const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const sendMail = require('../utils/sendMail');

router.get('/', [auth], async (req, res) => {
  // Verify user login
  // const user = await getUserInfo(req, res);
  // // Return user email (if it exists), otherwise return 'unauthorized'
  // if (!user) return res.status(400).send({ error: 'Please log in.' });
  // res.send(user);
  const mailURL = await sendMail();
  res.send({ message: 'Congrats! You are logged in.', url: mailURL });
});

module.exports = router;
