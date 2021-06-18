const express = require('express');
const router = express.Router();
const { nanoid } = require('nanoid');
const Joi = require('joi');
const { genSalt, hash } = require('bcryptjs');
const validate = require('../middleware/validate');
const activationEmail = require('../utils/activationEmail');
const User = require('../models/user');

const validateRegister = (data) => {
  const schema = Joi.object({
    nombre: Joi.string().min(2).required(),
    apellido: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    pass: Joi.string().min(3).required(),
    confirmPass: Joi.string(),
  });
  return schema.validate(data);
};

router.post('/', [validate(validateRegister)], async (req, res) => {
  // Check if email already exists
  const duplicate = await User.findOne({
    email: req.body.email,
  });
  if (duplicate)
    return res.status(400).send({ error: 'Please use another email.' });
  // Generate Salt and Hash Password
  const salt = await genSalt(10);
  const hashedPass = await hash(req.body.pass, salt);
  // Create new 'user' document and save
  let user = new User({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    pass: hashedPass,
    codigoVerificador: nanoid(),
  });
  user = await user.save();
  // Send activation email
  const { link, preview } = await activationEmail(
    user.nombre,
    user.email,
    user.codigoVerificador
  );
  res.status(201).send({
    mensaje: 'Please check your email to verify your account.',
    link,
    preview,
  });
});

module.exports = router;
