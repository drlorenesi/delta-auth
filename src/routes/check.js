const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Usuario = require('../models/usuario');

router.get(
  '/',
  [auth([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])],
  async (req, res) => {
    // usuarioId es obtenido en el middleware 'auth'
    const { usuarioId, role } = res?.locals;
    const usuario = await Usuario.findById(usuarioId);
    res.send({
      mensaje: `Enhorabuena ${usuario.nombre}! Tu sesión se encuentra activa y tu role actual es ${role}.`,
    });
  }
);

module.exports = router;
