import nodemailer from "nodemailer";

export default async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASS, // ВАЖНО! Это спец пароль для приложения, а не обычный пароль для почты
    },
  });

  const body = JSON.parse(req.body);

  if (req.method === "POST") {
    let options;

    if (body?.amount && body?.product) {
      options = {
        from: "Dikor <robot@admin.dikor3d.com>",
        to: "verkhoturov314@gmail.com, dikorpanel3d@gmail.com",
        subject: `Dikor заказ ${body.product}`,
        html: `Заказ: ${body.product}, ${body.amount} шт <br/><br/>
          Имя: ${body.name}<br/>
          Телефон: ${body.phone}<br/>
          Эл. почта: ${body.email}<br/>
          <br/>
          P.S. Письмо сформировано автоматически, отвечать на него не нужно.`,
      };
    } else {
      options = {
        from: "Dikor <robot@admin.dikor3d.com>",
        to: "verkhoturov314@gmail.com, dikorpanel3d@gmail.com",
        subject: "Dikor заявка на обратный звонок",
        html: `Заявка на обратный звонок. <br/><br/>
          Имя: ${body.name}<br/>
          Телефон: ${body.phone}<br/>
          Эл. почта: ${body.email}<br/>
          <br/>
          P.S. Письмо сформировано автоматически, отвечать на него не нужно.`,
      };
    }

    try {
      await transporter.sendMail(options);
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", error });
    }

    res.status(200).json({ status: "succes" });
  }
};
