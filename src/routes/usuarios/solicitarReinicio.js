const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { nanoid } = require('nanoid');
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
  const usuario = await Usuario.findOneAndUpdate(
    { email: req.body.email },
    { codigoReinicio: nanoid() },
    { new: true }
  );
  if (usuario) {
    // Enviar correo de re-inicio
    const err = await emailReinicioPass(
      usuario.nombre,
      usuario.email,
      usuario.codigoReinicio
    );
    if (err) return res.status(500).send({ mensaje: err });
    res.send({
      mensaje:
        'Revisa tu correo para obtener instrucciones sobre como reinicar tu contraseña.',
    });
  } else {
    res.send({
      mensaje:
        'Revisa tu correo para obtener instrucciones sobre como reinicar tu contraseña.',
    });
  }
});

module.exports = router;
