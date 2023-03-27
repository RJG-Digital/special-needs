import nodemailer from 'nodemailer'
const sendMail = async(to, subject, text) => {
  try {
    const html = `
    <p>${text}</p>
    `;
    console.log('made message');
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD
        }
      });
      console.log('opened transporter')
      const info = await transporter.sendMail({
        from: 'specialNeedsEdu<specialneedseduapp@gmail.com>',
        to,
        subject,
        html
      });
      console.log('Message Sent: ', info.messageId);
      return info;
  } catch (error) {
    console.log(error.message);
  }
   
}

export {
    sendMail
}