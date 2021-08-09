const jwt = require('jsonwebtoken');

// Usar role de 'accessToken' para verificar acceso a recursos
// Usar 'infoSesion' para mostart accesos en UI

module.exports = function (sesionId, usuario, res) {
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
    // Enviar tokens como cookies seguras y infoSesion como header
    res
      .cookie('accessToken', accessToken, {
        // Nota: maxAge es opcional para el accessToken
        // maxAge: 1000 * 60 * 60 * 1, // cookie será eliminada después de 1 hora
        maxAge: 1000 * 60 * 5, // 5 mins
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      .cookie('refreshToken', refreshToken, {
        // maxAge: 1000 * 60 * 60 * 8, // cookie será eliminada después de 8 horas
        maxAge: 1000 * 60 * 60 * 8,
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      // Info de sesión para UI (guardar en 'local storage')
      .header('info-session', infoSesion)
      .header('access-control-expose-headers', 'info-session');
  } catch (error) {
    throw new Error('No fue posible crear tokens.');
  }
};
