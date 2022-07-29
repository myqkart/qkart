let nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 25,
  auth: {
    user: process.env.NODEMAIL_EMAIL,
    pass: process.env.NODEMAIL_PASS,
  },
});

export default function (req, res) {
  const mailData = {
    to: "yshop674@gmail.com",
    from: req.body.email,
    subject: "Q-Kart support",
    text: req.body.message,
    html: `<div>${req.body.message}</div>`,
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err) res.json({ message: 'Internal server error', err });
    else res.json({ status: 200 });
  });
}
