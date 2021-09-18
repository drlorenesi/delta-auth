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

const rolesAutorizados = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

router.post(
  '/',
  [auth(rolesAutorizados), validar(validarUpdate)],
  async (req, res) => {
    // Generar Salt y Hash para nueva contraseña
    const salt = await genSalt(10);
    const hashedPass = await hash(req.body.passNueva, salt);
    const resultado = await Usuario.findOneAndUpdate(
      { _id: res.locals.usuarioId },
      { pass: hashedPass },
      { new: true }
    );
    if (!resultado) {
      return res
        .status(400)
        .send({ mensaje: 'Tu contraseña no pudo ser modificada.' });
    }
    res.send({ mensaje: 'Tu contraseña fue modificada existosamente.' });
  }
);

module.exports = router;
