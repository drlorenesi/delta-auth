const jwt = require('jsonwebtoken');

// Usar role de 'accessToken' para verificar acceso a recursos
// Usar 'infoSesion' para mostart accesos en UI

module.exports = function (sesionId, usuario) {
  try {
    // Crear accessToken con la información mínima
    // requerida para llevar acabo solicitudes del cliente
    // -> (sesionId, usuarioId, role)
    const accessToken = jwt.sign(
      { sesionId, usuarioId: usuario._id, role: usuario.role.nivel },
      process.env.FIRMA_JWT
    );
    // Crear refreshToken únicamente con el id de la
    // sesión -> (sesionId)
    const refreshToken = jwt.sign({ sesionId }, process.env.FIRMA_JWT);
    // Para UI
    // Enviar info de sesión y guardar en 'local storage'
    // infoSesion -> (usuarioId, nombre, apellido, email, role)
    const infoSesion = jwt.sign(
      {
        usuarioId: usuario._id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        role: usuario.role.nivel,
      },
      process.env.FIRMA_JWT
    );
    return { accessToken, refreshToken, infoSesion };
  } catch (error) {
    throw new Error('No fue posible crear tokens.');
  }
};
