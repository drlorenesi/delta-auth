const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');
const mongoose = require('mongoose');
const Joi = require('joi');
const User = require('../models/user');
const auth = require('../middleware/auth');

const validateUser = (data) => {
  const schema = Joi.object({
    nombre: Joi.string().min(2).required(),
    apellido: Joi.string().min(2).required(),
    email: Joi.string().email(),
  });
  return schema.validate(data);
};

router.get('/', [auth([1])], async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.get('/:id', [auth([1])], async (req, res) => {
  // Check for valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send({ message: 'The resource does not exist.' });
  const user = await User.findById(req.params.id);
  // If user does not exists return 404 error
  if (!user)
    return res.status(400).send({ message: 'The resource does not exist.' });
  res.send(user);
});

router.put('/:id', [auth([1]), validate(validateUser)], async (req, res) => {
  // Check for valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send({ message: 'The resource does not exist.' });
  // Check if user exists
  let user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  // If user does not exists return 404 error
  if (!user)
    return res.status(400).send({ message: 'The resource does not exist.' });
  // Update Document
  res.send(user);
});

// No POST route since a user can only be created by signing up

router.delete('/:id', [auth([1])], async (req, res) => {
  // Check for valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send({ message: 'The resource does not exist.' });
  // Check if user exists to delete
  const user = await User.findByIdAndDelete(req.params.id);
  // If user does not exists return 404 error
  if (!user)
    return res.status(400).send({ message: 'The resource does not exist.' });
  res.send(user);
});

module.exports = router;
