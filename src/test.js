const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "geekg1776@gmail.com",
    pass: "vsubtdwycplqmixk",
  },
});

const mailOptions = {
  from: "geekg1776@gmail.com",
  to: "odirahchukwumma28@gmail.com",
  subject: "Hello from Node.js",
  text: "This is a test email sent from Node.js using Nodemailer.",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Error occurred:", error);
  } else {
    console.log("Email sent successfully:", info.response);
  }
});
