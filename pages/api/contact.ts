import nodemailer from "nodemailer";

export default async (req, res) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "verkhoturov314@gmail.com",
      pass: "178805vA",
    },
  });

  if (req.method === "POST") {
    let result = await transporter.sendMail({
      from: '"Node js" <nodejs@example.com>',
      to: "verkhoturov314@gmail.com",
      subject: "Message from Node js",
      text: "This message was sent from Node js server.",
      html: "This <i>message</i> was sent from <strong>Node js</strong> server.",
    });

    console.log("result ===", result);
  } else {
    res.status(200).json({ message: `Response from /api/submit.` });
  }
};
