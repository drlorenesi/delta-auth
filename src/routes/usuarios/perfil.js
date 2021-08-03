const express = require('express');
const router = express.Router();
const validar = require('../../middleware/validar');
const Joi = require('joi');
const Usuario = require('../../models/usuario');
const auth = require('../../middleware/auth');

const validarInfo = (data) => {
  const schema = Joi.object({
    nombre: Joi.string(),
    apellido: Joi.string(),
    email: Joi.string().email().required(),
    extension: Joi.number().min(100).max(500).allow(''),
  });
  return schema.validate(data);
};

router.get('/', [auth([1])], async (req, res) => {
  const usuario = await Usuario.findById(res.locals.usuarioId);
  res.send(usuario);
});

router.put('/', [auth([1]), validar(validarInfo)], async (req, res) => {
  // Revisar si el usuario envió email e id válidos
  let valido = await Usuario.findOne({
    _id: res.locals.usuarioId,
    email: req.body.email,
  });
  if (!valido)
    return res
      .status(400)
      .send({ mensaje: 'Email e Id de usuario no concuerdan.' });
  let usuario = await Usuario.findOneAndUpdate(
    { _id: res.locals.usuarioId },
    req.body,
    { new: true }
  );
  res.send(usuario);
});

module.exports = router;
