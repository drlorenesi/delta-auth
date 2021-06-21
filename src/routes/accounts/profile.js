const express = require('express');
const router = express.Router();
const validate = require('../../middleware/validate');
const Joi = require('joi');
const User = require('../../models/user');
const auth = require('../../middleware/auth');

const validateUpdate = (data) => {
  const schema = Joi.object({
    nombre: Joi.string(),
    apellido: Joi.string(),
    email: Joi.string().email().required(),
    extension: Joi.number().min(100).max(500).allow(''),
  });
  return schema.validate(data);
};

router.get('/', [auth([1])], async (req, res) => {
  const user = await User.findById(res.locals.userId);
  res.send(user);
});

router.put('/', [auth([1]), validate(validateUpdate)], async (req, res) => {
  // Check if user sent in valid id and email
  let valid = await User.findOne({
    _id: res.locals.userId,
    email: req.body.email,
  });
  if (!valid)
    return res.status(400).send({ message: 'User Id and email do not match.' });
  let user = await User.findOneAndUpdate({ _id: res.locals.userId }, req.body, {
    new: true,
  });
  res.send(user);
});

module.exports = router;
