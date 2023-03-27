import nodemailer from 'nodemailer'
const sendMail = async(to, subject, text) => {
    const html = `
    <a href="${text}">Password reset link</a>
    `
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD
        }
      });
      const info = await transporter.sendMail({
        from: 'specialNeedsEdu<specialneedseduapp@gmail.com>',
        to,
        subject,
        html
      });
      console.log('Message Sent: ', info.messageId);
      return info;
}

export {
    sendMail
}