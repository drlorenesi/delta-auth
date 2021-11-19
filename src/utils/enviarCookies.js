module.exports = function (accessToken, refreshToken, infoSesion, res) {
  try {
    // Enviar tokens como cookies seguras e infoSesion como header
    res
      .cookie('accessToken', accessToken, {
        // Nota: maxAge es opcional para el accessToken
        // maxAge: 1000 * 60 * 60 * 1, // cookie será eliminada después de 1 hora
        maxAge: 1000 * 60 * 5, // 5 min
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      .cookie('refreshToken', refreshToken, {
        // maxAge: 1000 * 60 * 60 * 8, // cookie será eliminada después de 8 horas
        maxAge: 1000 * 60 * 15, // 15 mins
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      // Info de sesión para UI (guardar en 'local storage')
      .header('info-sesion', infoSesion)
      .header('access-control-expose-headers', 'info-sesion');
  } catch (error) {
    throw new Error('No fue posible crear cookies.');
  }
};
