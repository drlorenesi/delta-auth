const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { compare } = require('bcryptjs');
const validate = require('../../middleware/validate');
const createSession = require('../../utils/createSession');
const createTokens = require('../../utils/createTokens');
const User = require('../../models/user');
const Session = require('../../models/session');

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    pass: Joi.string().required(),
  });
  return schema.validate(data);
};

router.post('/', [validate(validateLogin)], async (req, res) => {
  // Look up user
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user)
    return res.status(400).send({ message: 'Invalid email or password.' });
  // Check if account has been verified
  if (!user.verificado)
    return res
      .status(401)
      .send({ message: 'Your account has not been verified.' });
  // Get user password
  const savedPassword = user.pass;
  // Compare password with one in DB
  const isRegistered = await compare(req.body.pass, savedPassword);
  if (!isRegistered)
    return res.status(400).send({ message: 'Invalid email or password.' });
  // Check if user has been suspended
  if (user.suspendido)
    return res
      .status(403)
      .send({ message: 'Your account has been temporarily suspended.' });
  // Check for active sessions
  const activeSessions = await Session.find({ 'user._id': user._id });
  if (activeSessions.length > 0) {
    // Allow only 1 active session at a time
    await Session.deleteMany({ 'user._id': user._id });
    // Create a new session
    const sessionId = await createSession(user._id, req);
    // Create and set Cookie Tokens
    createTokens(sessionId, user, res);
    return res.send({
      message:
        'You are now logged in. For security purposes your last session was expired.',
    });
  }
  // If there is no active session, create a new one
  const sessionId = await createSession(user._id, req);
  // Create and set Cookie Tokens
  createTokens(sessionId, user, res);
  res.send({ message: 'You are now logged in.' });
});

module.exports = router;
