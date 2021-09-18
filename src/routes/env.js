const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  console.log(process.env.MAIL_HOST);
  console.log(process.env.MAIL_PORT);
  console.log(process.env.MAIL_USER);
  console.log(process.env.MAIL_PASS);

  res.send({
    mensaje: 'Test route...',
  });
});

module.exports = router;
