const express = require('express');
const Joi = require('joi');
const { validateBody } = require('../middleware/validar');
const auth = require('../middleware/auth');
const Usuario = require('../models/usuario');

const router = express.Router();

const validarInfo = (data) => {
  const schema = Joi.object({
    nombre: Joi.string(),
    apellido: Joi.string(),
    extension: Joi.string(),
  });
  return schema.validate(data);
};

const rolesAutorizados = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

router.get('/', [auth(rolesAutorizados)], async (req, res) => {
  const usuario = await Usuario.findById(res.locals.usuarioId);
  res.send({
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    email: usuario.email,
    extension: usuario.extension,
    ultimoIngreso: usuario.ultimoIngreso,
  });
});

router.put(
  '/',
  [auth(rolesAutorizados), validateBody(validarInfo)],
  async (req, res) => {
    let usuario = await Usuario.findById(res.locals.usuarioId);
    req.body?.nombre && (usuario.nombre = req.body.nombre);
    req.body?.apellido && (usuario.apellido = req.body.apellido);
    req.body?.extension && (usuario.extension = req.body.extension);
    await usuario.save();
    res.send({ mensaje: 'Perfil actualizado.' });
  }
);

module.exports = router;
