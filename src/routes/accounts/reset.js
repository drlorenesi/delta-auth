const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validate = require('../../middleware/validate');
const User = require('../../models/user');
const resetPassEmail = require('../../utils/resetPassEmail');

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
    // Send reset password email
    const { link, preview } = await resetPassEmail(user.nombre, user.email);
    res.send({
      message:
        'Check your email for instructions on how to reset your password.',
      link,
      preview,
    });
  } else {
    res.send({
      message:
        'Check your email for instructions on how to reset your password.',
    });
  }
});

module.exports = router;
