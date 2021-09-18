const smtp = require('./smtp');

module.exports = async (email) => {
  let err;
  try {
    console.log('Iniciando envío de correo...');
    await smtp.sendMail({
      from: `"Notificaciones 🍫" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Email de Prueba',
      html: `<h3>¡Hola!</h3>
          <p>Este es un correo de prueba.</p>`,
    });
    console.log('Correo enviado!');
  } catch (error) {
    console.log('Error con el envío del correo: ', error);
    err = error.response;
  }
  // Retornar 'err' para evitar que el resto de la ruta se ejecute.
  return err;
};
