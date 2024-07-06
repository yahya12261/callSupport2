import nodemailer, { Transporter } from 'nodemailer';

export class EmailService {
  private transporter: Transporter;

  constructor() {
    console.log(process.env.EMAIL,process.env.EMAIL_PASSOWRD)
    this.transporter = nodemailer.createTransport({
      service: process.env.MAILTYPE,
      auth: {
        user: process.env.EMAIL?.toString(),
        pass: process.env.EMAIL_PASSOWRD?.toString()
      }
    });

  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL?.toString(),
      to,
      subject,
      text
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}

// Usage example