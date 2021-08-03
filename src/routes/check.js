const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Usuario = require('../models/usuario');

router.get('/', [auth([1])], async (req, res) => {
  // Obtener usuarioId de middleware 'auth'
  const { usuarioId } = res.locals;
  const usuario = await Usuario.findById(usuarioId);
  res.send({
    mensaje: `Enhorabuena ${usuario.nombre}! Tu sesión se encuentra activa.`,
  });
});

module.exports = router;
