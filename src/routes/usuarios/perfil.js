const express = require('express');
const Joi = require('joi');
const validar = require('../../middleware/validar');
const auth = require('../../middleware/auth');
const Usuario = require('../../models/usuario');

const router = express.Router();

const validarInfo = (data) => {
  const schema = Joi.object({
    nombre: Joi.string(),
    apellido: Joi.string(),
    extension: Joi.number().min(100).max(500).allow(''),
    email: Joi.string().email().required(),
  });
  return schema.validate(data);
};

const rolesAutorizados = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

router.get('/', [auth(rolesAutorizados)], async (req, res) => {
  const usuario = await Usuario.findById(res.locals.usuarioId);
  res.send({
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    email: usuario.email,
    extension: usuario.extension,
    ingresoAnterior: usuario.ingresoAnterior,
  });
});

router.put(
  '/',
  [auth(rolesAutorizados), validar(validarInfo)],
  async (req, res) => {
    // Revisar si el correo enviado por el usuario es el mismo que está registrado.
    // No se deben autorizar actualizaciones de correos.
    const usuario = await Usuario.findById(res.locals.usuarioId);
    if (usuario.email === req.body.email) {
      let actualizado = await Usuario.findOneAndUpdate(
        { _id: res.locals.usuarioId },
        req.body,
        { new: true }
      );
      return res.send({
        nombre: actualizado.nombre,
        apellido: actualizado.apellido,
        email: actualizado.email,
        extension: actualizado.extension,
      });
    } else {
      return res
        .status(400)
        .send({ mensaje: 'No puedes actualizar tu correo.' });
    }
  }
);

module.exports = router;
