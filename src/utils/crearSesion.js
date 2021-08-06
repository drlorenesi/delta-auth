const { nanoid } = require('nanoid');
const Sesion = require('../models/sesion');
const Usuario = require('../models/usuario');

module.exports = async function (usuarioId, req) {
  // Obtener información de usuario
  const infoUsuario = await Usuario.findById(usuarioId);
  // Generar id de sesión
  const sesionId = nanoid();
  // Obtener información sobre la conexión
  const infoConexion = {
    ip: req.ip,
    userAgent: req.headers['user-agent'],
  };
  // Crear nueva sesión y guardar en DB
  let sesion = new Sesion({
    sesionId,
    usuario: {
      _id: infoUsuario._id,
      nombre: infoUsuario.nombre,
      apellido: infoUsuario.apellido,
      email: infoUsuario.email,
      role: infoUsuario.role,
    },
    userAgent: infoConexion.userAgent,
    ip: infoConexion.ip,
  });
  sesion = await sesion.save();
  // Retornar id de sesión
  return sesionId;
};
