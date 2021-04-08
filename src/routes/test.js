const express = require('express');
const router = express.Router();

router.get('/', [], async (req, res) => {
  try {
    // Verify user login
    const user = await getUserInfo(req, res);
    // Return user email (if it exists), otherwise return 'unauthorized'
    if (!user) return res.status(400).send('Please log in.');
    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
