const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Sesion = require('../../models/sesion');

router.get('/', [], async (req, res) => {
  // Revisar si existe refreshToken (usuar 'optional chaining' para evitar errores)
  if (req?.cookies?.refreshToken) {
    // Obtener Refresh Token
    const { refreshToken } = req.cookies;
    // Devodificar Access Token
    const { sessionId } = jwt.verify(refreshToken, process.env.FIRMA_JWT);
    // Eliminar session de DB
    await Sesion.deleteOne({ sessionId });
  }
  // Eliminar Cookies. Tomar en cuenta nota de abajo.
  // "Web browsers and other compliant clients will only clear the cookie if
  // the given options is identical to those given to res.cookie(),
  // excluding expires and maxAge.""
  res
    .clearCookie('accessToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })
    .clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })
    .send({ mensaje: 'Tu sesión ha terminado.' });
});

module.exports = router;
