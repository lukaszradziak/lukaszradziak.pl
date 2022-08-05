const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_SECURE == 'true' ? true : false,
  ignoreTLS: process.env.MAIL_IGNORE_TLS == 'true' ? true : false,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

const sendEmail = async (content) => {
  await transporter.sendMail({
    from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
    to: process.env.MAIL_TO,
    subject: "Contact Form",
    text: content,
  });
};

const verifyRecaptcha = async (code) => {
  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${code}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        method: "POST",
      }
    );
    const result = await response.json();

    if (!result.success) {
      return false;
    }
  } catch (error) {
    return false;
  }

  return true;
};

export default async function handler(req, res) {
  const { body } = req;

  if (!body.name || !body.email || !body.message) {
    return res.status(422).json({ error: "Fill all fields." });
  }

  if(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY){
    if(!body.captcha){
      return res.status(422).json({ error: "Fill captcha." });
    }

    const recaptcha = await verifyRecaptcha(body.captcha);
    if (!recaptcha) {
      return res.status(422).json({ error: "Wrong captcha." });
    }
  }
  
  const mail = `${body.name} <${body.email}> \n\n ${body.message}`;

  try {
    await sendEmail(mail);
  } catch(e){
    console.error(e);
    return res.status(403).json({ error: "Problem with sending email." });
  }

  res.status(200).json({ success: true });
}
