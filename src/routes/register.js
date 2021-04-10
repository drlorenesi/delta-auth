const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { genSalt, hash } = require('bcryptjs');
const validate = require('../middleware/validate');
const createSession = require('../utils/createSession');
const createTokens = require('../utils/createTokens');
const setCookies = require('../utils/setCookies');
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
    'email.address': req.body.email,
  });
  if (duplicate)
    return res.status(400).send({ message: 'Please use another email.' });
  // Generate Salt and Hash Password
  const salt = await genSalt(10);
  const hashedPassword = await hash(req.body.password, salt);
  // Create user document and save
  let user = new User({
    'email.address': req.body.email,
    password: hashedPassword,
  });
  user = await user.save();
  // Create Session
  const sessionId = await createSession(user._id, req);
  // Create Tokens
  const { accessToken, refreshToken } = createTokens(sessionId, user._id);
  // Set Cookies
  setCookies(accessToken, refreshToken, res);
  res.status(201).send({ message: 'You are now logged in.' });
});

module.exports = router;
