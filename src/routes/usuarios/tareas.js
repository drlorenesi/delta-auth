const express = require('express');
const router = express.Router();
const validate = require('../../middleware/validar');
const mongoose = require('mongoose');
const Joi = require('joi');
const Tarea = require('../../models/tarea');
const auth = require('../../middleware/auth');

const validateTarea = (data) => {
  const schema = Joi.object({
    descripcion: Joi.string().required(),
    completed: Joi.boolean(),
  });
  return schema.validate(data);
};

const rolesAutorizados = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

router.get('/', [auth(rolesAutorizados)], async (req, res) => {
  const tareas = await Tarea.find({ usuarioId: res.locals.usuarioId });
  res.send(tareas);
});

router.get('/:id', [auth(rolesAutorizados)], async (req, res) => {
  // Validar ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res
      .status(404)
      .send({ mensaje: 'El recurso solicitado no existe.' });
  const tarea = await Tarea.find({
    _id: req.params.id,
    usuarioId: res.locals.usuarioId,
  });
  // Si el ObjectId es válido pero la tarea no existe, retornar error tipo 404
  if (!tarea)
    return res
      .status(404)
      .send({ mensaje: 'El recurso solicitado no existe.' });
  res.send(tarea);
});

router.put(
  '/:id',
  [auth(rolesAutorizados), validate(validateTarea)],
  async (req, res) => {
    // Validar ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res
        .status(404)
        .send({ mensaje: 'El recurso solicitado no existe.' });
    // Si el ObjectId es válido pero la tarea no existe, retornar error tipo 404
    let tarea = await Tarea.findOneAndUpdate(
      {
        _id: req.params.id,
        usuarioId: res.locals.usuarioId,
      },
      req.body,
      {
        new: true,
      }
    );
    // If tarea does not exists return 404 error
    // Si el ObjectId es válido pero el role no existe, retornar error tipo 404
    if (!tarea)
      return res
        .status(404)
        .send({ mensaje: 'El recurso solicitado no existe.' });
    res.send(tarea);
  }
);

router.post(
  '/',
  [auth(rolesAutorizados), validate(validateTarea)],
  async (req, res) => {
    // Create new 'tarea' document and save
    let tarea = req.body;
    tarea.usuarioId = res.locals.usuarioId;
    let newTarea = new Tarea(tarea);
    // Save document
    newTarea = await newTarea.save();
    res.send(newTarea);
  }
);

router.delete('/:id', [auth(rolesAutorizados)], async (req, res) => {
  // Check for valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res
      .status(404)
      .send({ mensaje: 'El recurso solicitado no existe.' });
  // Check if tarea exists to delete
  const tarea = await Tarea.findOneAndDelete({
    _id: req.params.id,
    usuarioId: res.locals.usuarioId,
  });
  // If tarea does not exists return 404 error
  if (!tarea)
    return res
      .status(404)
      .send({ mensaje: 'El recurso solicitado no existe.' });
  res.send(tarea);
});

module.exports = router;
