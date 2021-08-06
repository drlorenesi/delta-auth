const jwt = require('jsonwebtoken');

module.exports = function (sesionId, usuario, res) {
  console.log(usuario.role.nivel);
  try {
    // Crear Access Token
    const accessToken = jwt.sign(
      // { sesionId, usuarioId: usuario._id, role: usuario.role },
      { sesionId, usuarioId: usuario._id },
      process.env.FIRMA_JWT
    );
    // Crear Refresh Token
    const refreshToken = jwt.sign({ sesionId }, process.env.FIRMA_JWT);
    // Crear info de sesión para utilizar en UI (guardar en 'local storage')
    const sessionInfo = jwt.sign(
      {
        usuarioId: usuario._id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        // role: usuario.role,
      },
      process.env.FIRMA_JWT
    );
    // Enviar tokens como cookies seguras y sesionId como header
    res
      .cookie('accessToken', accessToken, {
        // Nota: maxAge es opcional para el accessToken
        maxAge: 1000 * 60 * 60 * 1, // cookie será eliminada después de 1 hora
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      .cookie('refreshToken', refreshToken, {
        maxAge: 1000 * 60 * 60 * 8, // cookie será eliminada después de 8 horas
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      // Info de sesión para UI (guardar en 'local storage')
      .header('session-info', sessionInfo)
      .header('access-control-expose-headers', 'session-info');
  } catch (error) {
    throw new Error('No fue posible crear tokens.');
  }
};
