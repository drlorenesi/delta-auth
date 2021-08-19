const nodemailer = require('nodemailer');

module.exports = async (nombre, email, codigoReinicio) => {
  // https://nodemailer.com/about/
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  let link = `${process.env.URL_APP}/nueva?x=${encodeURIComponent(
    email
  )}&y=${codigoReinicio}`;

  let info = await transporter.sendMail({
    from: `"Node Auth API 👋" <no-reply@api.node.development>`,
    to: email,
    subject: 'Cambio de Contraseña',
    html: `<h3>¡Hola ${nombre}!</h3>
      <p>Por favor haz click en el link de abajo para reiniciar tu contraseña:</p>
      <p><a href="${link}">${link}</a></p>`,
  });

  let preview = nodemailer.getTestMessageUrl(info);

  return { link, preview };
};
