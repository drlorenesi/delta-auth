const smtp = require('./smtp');

module.exports = async (nombre, email, codigoReinicio) => {
  // Link de cambio de contraseña en Front End
  let link = `${process.env.URL_APP}/nueva?x=${encodeURIComponent(
    email
  )}&y=${codigoReinicio}`;

  let err;
  try {
    await smtp.sendMail({
      from: `"Notificaciones 🍫" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Reinicio de Contraseña',
      html: `<h3>¡Hola ${nombre}!</h3>
          <p>Por favor haz click en el enlace de abajo para reiniciar tu contraseña:</p>
          <p><a href="${link}">${link}</a></p>
          <p>Este enlace será válido hasta que inicies una nueva sesión.</p>`,
    });
    console.log('Enviando email de reinicio...');
  } catch (error) {
    err = error.response;
    console.log(err);
  }
  // Retornar 'err' para evitar que el resto del código se ejecute.
  return err;
};
