const express = require('express');
const Joi = require('joi');
const { genSalt, hash, compare } = require('bcryptjs');
const { validateBody } = require('../middleware/validar');
const auth = require('../middleware/auth');
const Usuario = require('../models/usuario');

const router = express.Router();

const validarUpdate = (data) => {
  const schema = Joi.object({
    passVieja: Joi.string().required(),
    passNueva: Joi.string().min(3).required(),
  });
  return schema.validate(data);
};

const rolesAutorizados = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

router.post(
  '/',
  [auth(rolesAutorizados), validateBody(validarUpdate)],
  async (req, res) => {
    // Revisar si concuerda contraseña original
    const resultado = await Usuario.findOne({
      _id: res.locals.usuarioId,
    });
    const concuerda = await compare(req.body.passVieja, resultado.pass);
    // Generar Salt y Hash para nueva contraseña
    if (concuerda) {
      const salt = await genSalt(10);
      const hashedPass = await hash(req.body.passNueva, salt);
      await Usuario.findOneAndUpdate(
        { _id: res.locals.usuarioId },
        { pass: hashedPass }
      );
      res.send({ mensaje: 'Tu contraseña fue modificada existosamente!' });
    } else {
      return res
        .status(400)
        .send({ mensaje: 'Tu contraseña anterior no concuerda.' });
    }
  }
);

module.exports = router;
