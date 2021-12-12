const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const { validateBody } = require('../middleware/validar');
const auth = require('../middleware/auth');
const Usuario = require('../models/usuario');
const { Role } = require('../models/role');

const router = express.Router();

const validarUsuario = (data) => {
  const schema = Joi.object({
    roleId: Joi.string().alphanum().length(24).required(),
    suspendido: Joi.boolean().required(),
  });
  return schema.validate(data);
};

const rolesAutorizados = [0];

// GET
router.get('/', [auth(rolesAutorizados)], async (req, res) => {
  const usuarios = await Usuario.find();
  res.send(usuarios);
});

// GET
router.get('/:id', [auth(rolesAutorizados)], async (req, res) => {
  // Validar ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res
      .status(400)
      .send({ mensaje: 'El Id del recurso solicitado no es válido.' });
  const usuario = await Usuario.findById(req.params.id);
  // Si el ObjectId es válido pero el role no existe, retornar error tipo 404
  if (!usuario)
    return res
      .status(404)
      .send({ mensaje: 'El recurso solicitado no existe.' });
  res.send(usuario);
});

// PUT
router.put(
  '/:id',
  [auth(rolesAutorizados), validateBody(validarUsuario)],
  async (req, res) => {
    // Validar ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res
        .status(400)
        .send({ mensaje: 'El Id del recurso solicitado no es válido.' });
    // Verificar si existe usuario
    let usuario = await Usuario.findById(req.params.id);
    // Si el ObjectId es válido pero el role no existe, retornar error tipo 404
    if (!usuario)
      return res
        .status(404)
        .send({ mensaje: 'El recurso solicitado no existe.' });
    // Verificar si existe role
    let role = await Role.findById(req.body.roleId);
    if (!role)
      return res.status(400).send({ mensaje: 'El Id del role no es válido.' });
    // Actualizar recurso
    const update = await Usuario.findByIdAndUpdate(
      req.params.id,
      { role, suspendido: req.body.suspendido },
      { new: true }
    );
    res.send(update);
  }
);

// No hay POST. Usuario solo puede ser creado registrándose

// DELETE
router.delete('/:id', [auth(rolesAutorizados)], async (req, res) => {
  // Validar ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res
      .status(400)
      .send({ mensaje: 'El Id del recurso solicitado no es válido.' });
  // Verificar si existe usuario
  const usuario = await Usuario.findByIdAndDelete(req.params.id);
  // Si el ObjectId es válido pero el role no existe, retornar error tipo 404
  if (!usuario)
    return res
      .status(404)
      .send({ mensaje: 'El recurso solicitado no existe.' });
  res.send(usuario);
});

module.exports = router;
