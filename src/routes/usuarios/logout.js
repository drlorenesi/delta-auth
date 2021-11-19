const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Sesion = require('../../models/sesion');
const eliminarCookies = require('../../utils/eliminarCookies');

router.get('/', [], async (req, res) => {
  // Revisar si existe refreshToken
  if (req.cookies?.refreshToken) {
    // Obtener refreshToken
    const { refreshToken } = req.cookies;
    // Decodificar accessToken
    const { sesionId } = jwt.verify(refreshToken, process.env.FIRMA_JWT);
    // Eliminar session de DB
    await Sesion.deleteOne({ sesionId });
  }
  eliminarCookies(res);
  res.send({ mensaje: 'Tu sesión ha terminado.' });
});

module.exports = router;
