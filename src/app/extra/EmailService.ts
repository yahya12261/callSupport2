import nodemailer, { Transporter } from 'nodemailer';
import APIError from '../global/response/apierror';
import Err from '../global/response/errorcode';

export class EmailService {
  private transporter: Transporter;

  constructor() {
    console.log(process.env.EMAIL,process.env.EMAIL_PASSOWRD)
    this.transporter = nodemailer.createTransport({
      service: process.env.MAILTYPE,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSOWRD
      }
    });

  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject,
      text
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
       new APIError("An error occurred", Err.InvalidLoginEmail);
    }
  }
}

// Usage example