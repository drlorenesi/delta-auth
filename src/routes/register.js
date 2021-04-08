const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { genSalt, hash } = require('bcryptjs');
const validate = require('../middleware/validate');
const createSession = require('../utils/createSession');
const createTokens = require('../utils/createTokens');
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
  const duplicate = await Users.findOne({
    'email.address': req.body.email,
  });
  console.log(duplicate);
  // if (duplicate) return res.status(400).send('Please use another email.');
  // // Generate Salt and Hash Password
  // const salt = await genSalt(10);
  // const hashedPassword = await hash(req.body.password, salt);
  // // Store in DB
  // const result = await users.insertOne({
  //   email: {
  //     address: req.body.email,
  //     verified: false,
  //   },
  //   password: hashedPassword,
  // });
  // const user = result.ops[0];
  // // Create Session
  // const sessionId = await createSession(user._id, req);
  // // Create Tokens
  // const { accessToken, refreshToken } = createTokens(sessionId, user._id);
  // // Set Cookies
  // res
  //   .cookie('accessToken', accessToken, { httpOnly: true })
  //   .cookie('refreshToken', refreshToken, {
  //     expires: new Date(Date.now() + 24 * 3600000), // cookie will be removed after 24 hours
  //     httpOnly: true,
  //   })
  //   .status(201)
  //   .send('You are now logged in.');
  res.send('Test');
});

module.exports = router;
