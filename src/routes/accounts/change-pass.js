const express = require('express');
const router = express.Router();
const validate = require('../../middleware/validate');
const Joi = require('joi');
const { genSalt, hash } = require('bcryptjs');
const User = require('../../models/user');
const auth = require('../../middleware/auth');

const validateUpdate = (data) => {
  const schema = Joi.object({
    newPass: Joi.string().min(3).required(),
  });
  return schema.validate(data);
};

router.post('/', [auth([1]), validate(validateUpdate)], async (req, res) => {
  // Generate Salt and Hash New Password
  const salt = await genSalt(10);
  const hashedPass = await hash(req.body.newPass, salt);
  await User.findOneAndUpdate(
    { _id: res.locals.userId },
    { pass: hashedPass },
    { new: true }
  );
  res.send({ message: 'Password successfully changed.' });
});

module.exports = router;
