const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validate = require('../../middleware/validar');
const Usuario = require('../../models/usuario');
const emailResetPass = require('../../utils/emailResetPass');

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
    const { link, preview } = await emailResetPass(
      usuario.nombre,
      usuario.email
    );
    res.send({
      message:
        'Check your email for instructions on how to reset your password.',
      link,
      preview,
    });
  } else {
    res.send({
      message:
        'Check your email for instructions on how to reset your password.',
    });
  }
});

module.exports = router;
