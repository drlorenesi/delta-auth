const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validate = require('../../middleware/validar');
const Usuario = require('../../models/usuario');
const emailReinicioPass = require('../../utils/emailReinicioPass');

const validateEmail = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  return schema.validate(data);
};

router.post('/', [validate(validateEmail)], async (req, res) => {
  // Look up usuario
  const usuario = await Usuario.findOne({
    email: req.body.email,
  });
  if (usuario) {
    // Send reset password email
    const { link, preview } = await emailReinicioPass(
      usuario.nombre,
      usuario.email
    );
    res.send({
      mensaje:
        'Revisa tu correo para obtener instrucciones sobre como reinicar tu contraseña.',
      link,
      preview,
    });
  } else {
    res.send({
      mensaje:
        'Revisa tu correo para obtener instrucciones sobre como reinicar tu contraseña.',
    });
  }
});

module.exports = router;
