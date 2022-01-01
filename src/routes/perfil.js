const express = require('express');
const Joi = require('joi');
const { isValidObjectId } = require('mongoose');
const { validateBody } = require('../middleware/validar');
const auth = require('../middleware/auth');
const Usuario = require('../models/usuario');
// const { Role } = require('../models/Role');
var pick = require('lodash/pick');

const router = express.Router();

const validarInfo = (data) => {
  const schema = Joi.object({
    nombre: Joi.string().min(2).max(255).required(),
    apellido: Joi.string().min(2).max(255).required(),
    extension: Joi.string().max(255).allow('', null),
    email: Joi.string().email(),
    role: Joi.string(),
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
      _id: usuario.role._id,
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
    const { nombre, apellido, extension, role } = req.body;

    if (!isValidObjectId(role))
      return res.status(400).send({ mensaje: 'Id de Role es inválido' });

    const actualizado = await Usuario.findByIdAndUpdate(
      res.locals.usuarioId,
      {
        nombre,
        apellido,
        extension,
      },
      { new: true }
    );
    res.send(
      pick(actualizado, [
        'nombre',
        'apellido',
        'email',
        'role',
        'extension',
        'ultimoIngreso',
      ])
    );
  }
);

module.exports = router;
