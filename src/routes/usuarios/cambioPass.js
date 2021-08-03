const express = require('express');
const router = express.Router();
const validar = require('../../middleware/validar');
const Joi = require('joi');
const { genSalt, hash } = require('bcryptjs');
const Usuario = require('../../models/usuario');
const auth = require('../../middleware/auth');

const validarUpdate = (data) => {
  const schema = Joi.object({
    passNueva: Joi.string().min(3).required(),
  });
  return schema.validate(data);
};

router.post('/', [auth([1]), validar(validarUpdate)], async (req, res) => {
  // Generar Salt y Hash para nueva contraseña
  const salt = await genSalt(10);
  const hashedPass = await hash(req.body.passNueva, salt);
  await Usuario.findOneAndUpdate(
    { _id: res.locals.userId },
    { pass: hashedPass },
    { new: true }
  );
  res.send({ mensaje: 'Cambio de contraseña exitoso.' });
});

module.exports = router;
