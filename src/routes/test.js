const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
// const { User } = require('../models/user');

router.get('/', [auth([1])], async (req, res) => {
  // const { userId } = res.locals;

  res.send({ message: 'Congrats! Your session is active.' });
});

module.exports = router;
