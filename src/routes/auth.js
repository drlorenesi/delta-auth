const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { compare } = require('bcryptjs');
const validate = require('../middleware/validate');
const createSession = require('../utils/createSession');
const createTokens = require('../utils/createTokens');

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};

router.post('/', [validate(validateLogin)], async (req, res) => {
  // Get 'users' collection from DB
  const { users } = require('../config/collections');
  // Look up user
  const user = await users.findOne({
    'email.address': req.body.email,
  });
  if (!user) return res.status(400).send('Invalid email or password.');
  // Get user password
  const savedPassword = user.password;
  // Compare password with one in DB
  const isRegistered = await compare(req.body.password, savedPassword);
  if (!isRegistered) return res.status(400).send('Invalid email or password.');
  // Create Session
  const sessionId = await createSession(user._id, req);
  // Create Tokens
  const { accessToken, refreshToken } = createTokens(sessionId, user._id);
  // Set Cookies
  res
    .cookie('accessToken', accessToken, { httpOnly: true })
    .cookie('refreshToken', refreshToken, {
      expires: new Date(Date.now() + 24 * 3600000), // cookie will be removed after 24 hours
      httpOnly: true,
    })
    .status(200)
    .send('You are now logged in.');
});

module.exports = router;
