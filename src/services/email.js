import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
export default class EmailService {
  verifyEmailAddress = async (email, token, firstName) => {
    const message = {
      to: "nwodochristian@gmail.com",
      from: process.env.mail_master,
      subject: "Sending with SendGrid is Fun",
      text: "and easy to do anywhere, even with Node.js",
      html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };
    return await this.sendEmail(message);
  };
  sendEmail = async (emailBody) => {
    try {
      const isEmailSent = await sgMail.send(emailBody)
      if (isEmailSent) return true;
      return false;
    } catch (error) {
      throw error;
    }
  };
}
