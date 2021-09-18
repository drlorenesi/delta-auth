const express = require('express');
const router = express.Router();
const emailTest = require('../utils/emailTest');

router.get('/', async (req, res) => {
  console.log(req.query.x);
  // Enviar email de prueba de cuenta
  const { info, err } = await emailTest(req.query.x);
  if (err) return res.status(500).send({ mensaje: err });
  console.log(info);
  res.send({
    mensaje: 'Correo enviado!',
    response: info.response,
    info: info.envelope,
    messageId: info.messageId,
  });
});

module.exports = router;
