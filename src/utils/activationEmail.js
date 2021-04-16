const nodemailer = require('nodemailer');

module.exports = async (email, verificationCode) => {
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

  let link = `${process.env.BASE_URL}verify?x=${encodeURIComponent(
    email
  )}&y=${verificationCode}`;

  let info = await transporter.sendMail({
    from: `"Node Auth API 👋" <no-reply@node-auth.dev>`,
    to: email,
    subject: 'Please Activate your Account',
    html: `<h3>Hello!</h3>
      <p>Thanks for registering! Please click on the confirmation code below to activate your account:</p>
      <p><a href="${link}">${link}</a></p>`,
  });
  console.log('Message sent: %s', info.messageId);
  return link;
};
