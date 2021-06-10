const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/user');

router.get('/', [auth([1])], async (req, res) => {
  // Get userId from auth middleware
  const { userId } = res.locals;
  const user = await User.findById(userId);
  res.send({ message: `Congrats ${user.nombre}! Your session is active.` });
});

module.exports = router;
