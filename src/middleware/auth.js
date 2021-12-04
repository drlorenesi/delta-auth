// Middleware que identifica a usuario y espera un array de 'roles'
// autorizados para acceder a un recurso
// Ejemplo: [auth([0, 1, 2, 3, ...])]
const jwt = require('jsonwebtoken');
const Session = require('../models/session');
const Usuario = require('../models/usuario');
const crearTokens = require('../utils/crearTokens');
const crearCookies = require('../utils/crearCookies');
const eliminarCookies = require('../utils/eliminarCookies');

module.exports = (param) => {
  return async (req, res, next) => {
    // 1. Revisar si existe accessToken
    // --------------------------------
    if (req.cookies.accessToken) {
      // Decodificar accessToken
      const { usuarioId, role } = jwt.verify(
        req.cookies.accessToken,
        process.env.JWT_SIGNATURE
      );
      // Agregar usuarioId a 'res.locals' para poder utilizarlo en la próxima función.
      // Por ejemplo:
      // const { usuarioId } = res.locals;
      // const usuario = await Usuario.findById(usuarioId);
      res.locals.usuarioId = usuarioId;
      res.locals.role = role;
      // Revisar si el role puede acceder al recurso
      if (!param.includes(role))
        return res.status(403).send({ mensaje: 'Acceso denegado.' });
      next();
    }
    // 2. Revisar si existe refreshToken
    // ---------------------------------
    else if (req.cookies.refreshToken) {
      // Decodificar refreshToken
      const { sessionId } = jwt.verify(
        req.cookies.refreshToken,
        process.env.JWT_SIGNATURE
      );
      // Obtener información sobre la sesión
      const session = await Session.findOne({ sessionId });
      if (!session || !session.valida) {
        eliminarCookies(res);
        return res
          .status(401)
          .send({ mensaje: 'Acceso denegado. Por favor inicia sesión.' });
      }
      // Si la sesión es válida, buscar a usuario
      const usuario = await Usuario.findOne({ _id: session.usuario._id });
      // Crear nuevos tokens
      const { accessToken, refreshToken, sessionInfo } = crearTokens(
        sessionId,
        usuario
      );
      // Crear nuevas cookies
      crearCookies(accessToken, refreshToken, sessionInfo, res);
      // Agregar usuarioId a 'res.locals' para poder utilizarlo en la próxima función.
      res.locals.usuarioId = usuario._id;
      res.locals.role = usuario.role.nivel;
      // Revisar si el role puede acceder al recurso
      if (!param.includes(usuario.role.nivel))
        return res.status(403).send({ mensaje: 'Acceso denegado.' });
      next();
      // 3. Si usuario no cuenta con token(s)
      // ------------------------------------
    } else {
      return res
        .status(401)
        .send({ mensaje: 'Acceso denegado. Por favor inicia sesión.' });
    }
  };
};
