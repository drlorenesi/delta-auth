const nodemailer = require('nodemailer');

module.exports = async function () {
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

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Node Auth" <nodeauth@nodeauth.dev>', // sender address
    to: 'drlorenesi@gmail.com', // list of receivers
    subject: 'Please Verify Your Email', // Subject line
    html: '<b>Hello!</b> Please verify your email.', // html body
  });

  // Preview only available when sending through an Ethereal account
  console.log(
    'Message sent. Preview URL: %s',
    nodemailer.getTestMessageUrl(info)
  );
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
