const express = require('express');
const router = express.Router();
const { nanoid } = require('nanoid');
const Joi = require('joi');
const { genSalt, hash } = require('bcryptjs');
const validar = require('../../middleware/validar');
const emailActivarCuenta = require('../../utils/emailActivarCuenta');
const Usuario = require('../../models/usuario');

const validarRegistro = (data) => {
  const schema = Joi.object({
    nombre: Joi.string().min(2).required(),
    apellido: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    pass: Joi.string().min(3).required(),
    confirmPass: Joi.string(),
  });
  return schema.validate(data);
};

router.post('/', [validar(validarRegistro)], async (req, res) => {
  // Revisar si el email ya está registrado
  const duplicado = await Usuario.findOne({
    email: req.body.email,
  });
  if (duplicado)
    return res.status(400).send({ error: 'Por favor usar otro email.' });
  // Generar Salt y Hash a pass
  const salt = await genSalt(10);
  const hashedPass = await hash(req.body.pass, salt);
  // Crear nuevo documento de 'usuario' y guardar
  let usuario = new Usuario({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    pass: hashedPass,
    codigoVerificador: nanoid(),
  });
  usuario = await usuario.save();
  // Enviar email de activación de cuenta
  const { link, preview } = await emailActivarCuenta(
    usuario.nombre,
    usuario.email,
    usuario.codigoVerificador
  );
  res.status(201).send({
    mensaje: 'Por favor revisa tu email para activar tu cuenta.',
    link,
    preview,
  });
});

module.exports = router;