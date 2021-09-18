const express = require('express');
const router = express.Router();
const emailTest = require('../utils/emailTest');

router.get('/', async (req, res) => {
  console.log(req.query.x);
  // Enviar email de prueba de cuenta
  const err = await emailTest(req.query.x);
  if (err) return res.status(500).send({ mensaje: err });
  res.send({
    mensaje: 'Enviando correo...',
  });
});

module.exports = router;
