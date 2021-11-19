const smtp = require('./smtp');

module.exports = async (nombre, email, codigoVerificador) => {
  // Link de activacion de cuenta en Front End
  let link = `${process.env.URL_APP}/activar?x=${encodeURIComponent(
    email
  )}&y=${codigoVerificador}`;

  let err;
  try {
    await smtp.sendMail({
      from: `"Notificaciones 🍫" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Por Favor Activa tu Cuenta',
      html: `<h3>¡Hola ${nombre}!</h3>
          <p>Gracias por registrarte. Por favor haz click en el enlace de abajo para activar tu cuenta:</p>
          <p><a href="${link}">${link}</a></p>`,
    });
  } catch (error) {
    err = error.response;
  }
  // Retornar 'err' para evitar que el resto de la ruta se ejecute.
  return err;
};
