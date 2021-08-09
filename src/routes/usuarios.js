const express = require('express');
const router = express.Router();
const validar = require('../middleware/validar');
const mongoose = require('mongoose');
const Joi = require('joi');
const Usuario = require('../models/usuario');
const auth = require('../middleware/auth');

const validarUsuario = (data) => {
  const schema = Joi.object({
    nombre: Joi.string().min(2).required(),
    apellido: Joi.string().min(2).required(),
    email: Joi.string().email(),
  });
  return schema.validate(data);
};

router.get('/', [auth([1])], async (req, res) => {
  const usuarios = await Usuario.find();
  res.send(usuarios);
});

router.get('/:id', [auth([1])], async (req, res) => {
  // Check for valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send({ message: 'The resource does not exist.' });
  const usuario = await Usuario.findById(req.params.id);
  // If usuario does not exists return 404 error
  if (!usuario)
    return res.status(400).send({ message: 'The resource does not exist.' });
  res.send(usuario);
});

router.put('/:id', [auth([1]), validar(validarUsuario)], async (req, res) => {
  // Check for valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send({ message: 'The resource does not exist.' });
  // Check if usuario exists
  let usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  // If usuario does not exists return 404 error
  if (!usuario)
    return res.status(400).send({ message: 'The resource does not exist.' });
  // Update Document
  res.send(usuario);
});

// No POST route since a usuario can only be created by signing up

router.delete('/:id', [auth([1])], async (req, res) => {
  // Check for valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send({ message: 'The resource does not exist.' });
  // Check if usuario exists to delete
  const usuario = await Usuario.findByIdAndDelete(req.params.id);
  // If usuario does not exists return 404 error
  if (!usuario)
    return res.status(400).send({ message: 'The resource does not exist.' });
  res.send(usuario);
});

module.exports = router;
