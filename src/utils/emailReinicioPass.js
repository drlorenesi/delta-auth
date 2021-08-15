const nodemailer = require('nodemailer');

module.exports = async (nombre, email) => {
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

  let link = `${process.env.URL_BASE}`;
  // let link = `${process.env.URL_BASE}reset?x=${encodeURIComponent(
  //   email
  // )}&y=${codigoVerificador}`;

  let info = await transporter.sendMail({
    from: `"Node Auth API 👋" <no-reply@api.node.development>`,
    to: email,
    subject: 'Cambio de Contraseña',
    html: `<h3>¡Hola ${nombre}!</h3>
      <p>Quieres cambiar tu contraseña?</p>`,
  });

  let preview = nodemailer.getTestMessageUrl(info);

  return { link, preview };
};
