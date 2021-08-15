const express = require('express');
const router = express.Router();
const validar = require('../../middleware/validar');
const Joi = require('joi');
const Usuario = require('../../models/usuario');
const auth = require('../../middleware/auth');

const validarInfo = (data) => {
  const schema = Joi.object({
    nombre: Joi.string(),
    apellido: Joi.string(),
    extension: Joi.number().min(100).max(500).allow(''),
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
  });
});

router.put(
  '/',
  [auth(rolesAutorizados), validar(validarInfo)],
  async (req, res) => {
    let usuario = await Usuario.findOneAndUpdate(
      { _id: res.locals.usuarioId },
      req.body,
      { new: true }
    );
    res.send({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      extension: usuario.extension,
    });
  }
);

module.exports = router;
