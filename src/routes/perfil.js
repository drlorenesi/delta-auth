const express = require('express');
const Joi = require('joi');
const { validateBody } = require('../middleware/validar');
const auth = require('../middleware/auth');
const Usuario = require('../models/usuario');

const router = express.Router();

const validarInfo = (data) => {
  const schema = Joi.object({
    nombre: Joi.string().max(255).required(),
    apellido: Joi.string().max(255).required(),
    extension: Joi.string().max(255).required(),
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
    role: {
      nivel: usuario.role.nivel,
      descripcion: usuario.role.descripcion,
    },
    extension: usuario.extension,
    ultimoIngreso: usuario.ultimoIngreso,
  });
});

router.put(
  '/',
  [auth(rolesAutorizados), validateBody(validarInfo)],
  async (req, res) => {
    const { nombre, apellido, extension } = req.body;
    await Usuario.findByIdAndUpdate(res.locals.usuarioId, {
      nombre,
      apellido,
      extension,
    });
    res.send({ mensaje: 'Perfil actualizado.' });
  }
);

module.exports = router;
