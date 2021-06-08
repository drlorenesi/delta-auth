const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');
const mongoose = require('mongoose');
const Joi = require('joi');
const Todo = require('../models/todo');
const auth = require('../middleware/auth');

const validateTodo = (data) => {
  const schema = Joi.object({
    descripcion: Joi.string().required(),
    completed: Joi.boolean(),
  });
  return schema.validate(data);
};

router.get('/', [auth([1])], async (req, res) => {
  const todos = await Todo.find();
  res.send(todos);
});

router.get('/:id', [auth([1])], async (req, res) => {
  // Check for valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send({ message: 'The resource does not exist.' });
  const todo = await Todo.findById(req.params.id);
  // If todo does not exists return 404 error
  if (!todo)
    return res.status(400).send({ message: 'The resource does not exist.' });
  res.send(todo);
});

router.put('/:id', [auth([1]), validate(validateTodo)], async (req, res) => {
  // Check for valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send({ message: 'The resource does not exist.' });
  // Check if todo exists
  let todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  // If todo does not exists return 404 error
  if (!todo)
    return res.status(400).send({ message: 'The resource does not exist.' });
  // Update Document
  res.send(todo);
});

// WORKING HERE
// WORKING HERE
// WORKING HERE
router.post('/', [auth([1]), validate(validateTodo)], async (req, res) => {
  // Create new 'todo' document and save
  let todo = req.body;
  todo.userId = res.locals.userId;
  let newTodo = new Todo(todo);
  // Save document
  newTodo = await newTodo.save();
  res.send(newTodo);
});

router.delete('/:id', [auth([1])], async (req, res) => {
  // Check for valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send({ message: 'The resource does not exist.' });
  // Check if todo exists to delete
  const todo = await Todo.findByIdAndDelete(req.params.id);
  // If todo does not exists return 404 error
  if (!todo)
    return res.status(400).send({ message: 'The resource does not exist.' });
  res.send(todo);
});

module.exports = router;
