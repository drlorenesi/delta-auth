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
  const tareas = await Tarea.find({ userId: res.locals.userId });
  res.send(tareas);
});

router.get('/:id', [auth(rolesAutorizados)], async (req, res) => {
  // Check for valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send({ message: 'The resource does not exist.' });
  const tarea = await Tarea.find({
    _id: req.params.id,
    usuarioId: res.locals.userId,
  });
  // If todo does not exists return 404 error
  if (!tarea)
    return res.status(400).send({ message: 'The resource does not exist.' });
  res.send(tarea);
});

router.put(
  '/:id',
  [auth(rolesAutorizados), validate(validateTarea)],
  async (req, res) => {
    // Check for valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send({ message: 'The resource does not exist.' });
    // Check if todo exists
    let todo = await Todo.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: res.locals.userId,
      },
      req.body,
      {
        new: true,
      }
    );
    // If todo does not exists return 404 error
    if (!todo)
      return res.status(400).send({ message: 'The resource does not exist.' });
    res.send(todo);
  }
);

router.post(
  '/',
  [auth(rolesAutorizados), validate(validateTarea)],
  async (req, res) => {
    // Create new 'todo' document and save
    let todo = req.body;
    todo.userId = res.locals.userId;
    let newTodo = new Todo(todo);
    // Save document
    newTodo = await newTodo.save();
    res.send(newTodo);
  }
);

router.delete('/:id', [auth(rolesAutorizados)], async (req, res) => {
  // Check for valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send({ message: 'The resource does not exist.' });
  // Check if todo exists to delete
  const todo = await Todo.findOneAndDelete({
    _id: req.params.id,
    userId: res.locals.userId,
  });
  // If todo does not exists return 404 error
  if (!todo)
    return res.status(400).send({ message: 'The resource does not exist.' });
  res.send(todo);
});

module.exports = router;
