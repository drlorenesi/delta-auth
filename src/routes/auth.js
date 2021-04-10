const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { compare } = require('bcryptjs');
const validate = require('../middleware/validate');
const createSession = require('../utils/createSession');
const createTokens = require('../utils/createTokens');
const setCookies = require('../utils/setCookies');
const User = require('../models/user');

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};

router.post('/', [validate(validateLogin)], async (req, res) => {
  // Look up user
  const user = await User.findOne({
    'email.address': req.body.email,
  });
  if (!user)
    return res.status(400).send({ message: 'Invalid email or password.' });
  // Get user password
  const savedPassword = user.password;
  // Compare password with one in DB
  const isRegistered = await compare(req.body.password, savedPassword);
  if (!isRegistered)
    return res.status(400).send({ message: 'Invalid email or password.' });
  // Create Session
  const sessionId = await createSession(user._id, req);
  // Create Tokens
  const { accessToken, refreshToken } = createTokens(sessionId, user._id);
  // Set Cookies
  setCookies(accessToken, refreshToken, res);
  res.status(200).send({ message: 'You are now logged in.' });
});

module.exports = router;
