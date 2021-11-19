// Middleware que espera un array de 'roles' permitidos para acceder a un recurso
// Ejemplo: [auth([0, 1, 2, 3, ...])]
const jwt = require('jsonwebtoken');
const Sesion = require('../models/sesion');
const Usuario = require('../models/usuario');
const crearTokens = require('../utils/crearTokens');
const enviarCookies = require('../utils/enviarCookies');
const eliminarCookies = require('../utils/eliminarCookies');

module.exports = (param) => {
  return async (req, res, next) => {
    // A. Revisar si existe accessToken (usuar 'optional chaining: "?"' para evitar errores)
    if (req.cookies?.accessToken) {
      // Decodificar accessToken
      const { usuarioId, role } = jwt.verify(
        req.cookies.accessToken,
        process.env.FIRMA_JWT
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
    // B. Revisar si existe refreshToken (usuar 'optional chaining: "?"' para evitar errores)
    else if (req.cookies?.refreshToken) {
      // Decodificar refreshToken
      const { sesionId } = jwt.verify(
        req.cookies.refreshToken,
        process.env.FIRMA_JWT
      );
      // Obtener información sobre la sesion
      const sesion = await Sesion.findOne({ sesionId });
      if (!sesion || !sesion.valida) {
        eliminarCookies(res);
        return res
          .status(401)
          .send({ mensaje: 'Acceso denegado. Por favor inicia sesión.' });
      }
      // Si la sesión es válida, buscar a usuario
      const usuario = await Usuario.findOne({ _id: sesion.usuario._id });
      // Crear nuevos tokens
      const { accessToken, refreshToken, infoSesion } = crearTokens(
        sesionId,
        usuario
      );
      // Enviar nuevas cookies
      enviarCookies(accessToken, refreshToken, infoSesion, res);
      // Agregar usuarioId a 'res.locals' para poder utilizarlo en la próxima función.
      res.locals.usuarioId = usuario._id;
      res.locals.role = usuario.role.nivel;
      // Revisar si el role puede acceder al recurso
      if (!param.includes(usuario.role.nivel))
        return res.status(403).send({ mensaje: 'Acceso denegado.' });
      next();
    } else {
      return res
        .status(401)
        .send({ mensaje: 'Acceso denegado. Por favor inicia sesión.' });
    }
  };
};
