const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validate = require('../middleware/validate');
const User = require('../models/user');

const validateEmail = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  return schema.validate(data);
};

router.post('/', [validate(validateEmail)], async (req, res) => {
  // Look up user
  const user = await User.findOne({
    email: req.body.email,
  });
  if (user) {
    res.send({ message: 'Reseting password...' });
  } else {
    res.send({ message: 'Ok...' });
  }
});

module.exports = router;
