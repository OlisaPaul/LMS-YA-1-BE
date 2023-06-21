require("dotenv").config();
var Mailgen = require("mailgen");
const nodemailer = require("nodemailer");

const { emailPass, emailId } = process.env;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailId,
    pass: emailPass,
  },
});

// Configure mailgen by setting a theme and your product info
const mailGenerator = new Mailgen({
  theme: "default",
  product: {
    // Appears in header & footer of e-mails
    name: "Geek",
    link: "https://mailgen.js/",
    // Optional product logo
    // logo: 'https://mailgen.js/img/logo.png'
  },
});

const email = (firstName) => {
  return {
    body: {
      name: firstName,
      intro: "Welcome to Geek! We're very excited to have you on board.",
      action: {
        instructions: "To get started with Geek, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Confirm your account",
          link: "https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010",
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

const emailBody = (firstName) => mailGenerator.generate(email(firstName));

const mailOptions = (receiversEmail, firstName) => {
  return {
    from: emailId,
    to: receiversEmail,
    subject: `Welcome to Geek!`,
    html: emailBody(firstName),
  };
};

module.exports = { transporter, mailOptions };
