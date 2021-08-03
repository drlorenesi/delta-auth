// Middleware que espera un array de 'role.nivel' permitidos para acceder a un recurso
// Ejemplo: [auth([1, 2, 3, ...])]
const jwt = require('jsonwebtoken');
const Sesion = require('../models/sesion');
const Usuario = require('../models/usuario');
const crearTokens = require('../utils/crearTokens');

module.exports = (param) => {
  return async (req, res, next) => {
    // Revisar si existe un Access Token
    // (Note: with optional chaining to avoid server error)
    if (req?.cookies?.accessToken) {
      // console.log('accessToken detectado...');
      // Decodificar Access Token

      // REVISAR accessLevel o role.nivel?
      // REVISAR accessLevel o role.nivel?
      // REVISAR accessLevel o role.nivel?
      // REVISAR accessLevel o role.nivel?
      const { accessLevel, usuarioId } = jwt.verify(
        req.cookies.accessToken,
        process.env.JWT_SIGNATURE
      );
      // Obtener el usuarioId ???
      // Obtener el usuarioId ???
      // Obtener el usuarioId ???
      res.locals.usuarioId = usuarioId;
      // Revisar si el nivel
      // Do auth check with usuario info here...
      if (!param.includes(accessLevel))
        return res.status(403).send({ mensaje: 'Acceso denegado.' });
      next();
    }
    // Revisar si existe un Refresh Token
    // (Note: with optional chaining to avoid server error)
    else if (req?.cookies?.refreshToken) {
      // console.log('refreshToken detectado...');
      // Decodificar Refresh Token
      const { sesionId } = jwt.verify(
        req.cookies.refreshToken,
        process.env.JWT_SIGNATURE
      );
      // Obtener información sobre la sesion
      const sesion = await Sesion.findOne({ sesionId });
      if (!sesion || !sesion.valid)
        return res
          .status(401)
          .send({ mensaje: 'Acceso denegado. Por favor inicia sesión.' });
      // Si la sesión es válida, buscar a usuario
      const usuario = await Usuario.findOne({ _id: sesion.usuario._id });
      // Crear nuevos tokens
      crearTokens(sesionId, usuario, res);
      // Obtener el usuarioId ???
      // Obtener el usuarioId ???
      // Obtener el usuarioId ???
      res.locals.usuarioId = usuario._id;
      // Do auth check with usuario info here...
      if (!param.includes(usuario.accessLevel))
        return res.status(403).send({ mensaje: 'Acceso denegado.' });
      next();
    } else {
      return res
        .status(401)
        .send({ mensaje: 'Acceso denegado. Por favor inicia sesión.' });
    }
  };
};
