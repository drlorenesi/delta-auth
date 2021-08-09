const express = require('express');
const router = express.Router();
const validar = require('../middleware/validar');
const mongoose = require('mongoose');
const Joi = require('joi');
const Role = require('../models/role');
const auth = require('../middleware/auth');

const validarRole = (data) => {
  const schema = Joi.object({
    nivel: Joi.number().integer().min(0).max(10).required(),
    descripcion: Joi.string().min(2).max(255).required(),
  });
  return schema.validate(data);
};

router.get('/', [auth([0])], async (req, res) => {
  const roles = await Role.find();
  res.send(roles);
});

router.get('/:id', [auth([0])], async (req, res) => {
  // Validar ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res
      .status(400)
      .send({ mensaje: 'El recurso solicitado no existe.' });
  const role = await Role.findById(req.params.id);
  // Si el role no existe, retornar error tipo 404
  if (!role)
    return res
      .status(400)
      .send({ mensaje: 'El recurso solicitado no existe.' });
  res.send(role);
});

router.put('/:id', [auth([0]), validar(validarRole)], async (req, res) => {
  // Validar ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res
      .status(400)
      .send({ mensaje: 'El recurso solicitado no existe.' });
  // Si el role existe hacer actualización
  let role = await Role.findById(req.params.id);
  // HASTA AQUI ME QUEDÉ
  // Revisar si el nivel ya está asignado a otra descripción
  let test = await Role.find({ nivel: req.body.nivel });
  // HASTA AQUI ME QUEDÉ

  // Si el ObjectId es válido pero el role no existe, retornar error tipo 404
  if (!role)
    return res
      .status(400)
      .send({ mensaje: 'El recurso solicitado no existe.' });
  res.send(role);
});

router.post('/', [auth([0]), validar(validarRole)], async (req, res) => {
  // Revisar si el nivel ya fue utilizado
  const duplicado = await Role.find({ nivel: req.body.nivel });
  if (duplicado.length > 0)
    return res.status(400).send({ mensaje: 'El nivel ya está asignado.' });
  // Crear nuevo role
  let nuevoRole = new Role(req.body);
  // Guardar nuevo role
  nuevoRole = await nuevoRole.save();
  res.send(nuevoRole);
});

router.delete('/:id', [auth([0])], async (req, res) => {
  // Validar ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res
      .status(400)
      .send({ mensaje: 'El recurso solicitado no existe.' });
  // Si el role existe, eliminar
  const role = await Role.findByIdAndDelete(req.params.id);
  // Si el ObjectId es válido pero el role no existe, retornar error tipo 404
  if (!role)
    return res
      .status(400)
      .send({ mensaje: 'El recurso solicitado no existe.' });
  res.send(role);
});

module.exports = router;
