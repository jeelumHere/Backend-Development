import nodeMailer from "nodemailer"
import config from "../config/config.js"

const transporter = nodeMailer.createTransport({
    service : "gmail",
    auth : {
        type        : "OAuth2",
        user        : config.googleUser,
        clientId    : config.googleClientId,
        clientSecret: config.googleClientSecret,
        refreshToken: config.googleRefreshToken   
    }
})

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});


// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Your Name" <${config.googleUser}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodeMailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default sendEmail

