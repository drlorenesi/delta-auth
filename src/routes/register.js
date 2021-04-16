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
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
  });
  return schema.validate(data);
};

router.post('/', [validate(validateRegister)], async (req, res) => {
  // Check if email already exists
  const duplicate = await User.findOne({
    email: req.body.email,
  });
  if (duplicate)
    return res.status(400).send({ message: 'Please use another email.' });
  // Generate Salt and Hash Password
  const salt = await genSalt(10);
  const hashedPassword = await hash(req.body.password, salt);
  // Create new 'user' document and save
  let user = new User({
    email: req.body.email,
    password: hashedPassword,
    verificationCode: nanoid(),
  });
  user = await user.save();
  // Send activation email
  const link = await activationEmail(user.email, user.verificationCode);
  res
    .status(201)
    .send({ message: 'Please check your email to verify your account.', link });
});

module.exports = router;
