const nodemailer = require('nodemailer');

const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "sibtest438@gmail.com",
        pass: "ssafytest"
    },
    tls: {
        rejectUnauthorized: false
    }
  });

  module.exports={
      smtpTransport
  }