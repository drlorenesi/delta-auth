const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  console.log('Throwing debug error...');
  throw new Error('Logging Sentry error!');
});

module.exports = router;
