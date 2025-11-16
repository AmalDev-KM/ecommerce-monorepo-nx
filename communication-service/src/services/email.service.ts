import nodemailer from 'nodemailer';
import { otpEmailTemplate } from '../templetes/EmailOtpTemplete';

export async function sendOtpEmail(email: string, otp: string) {
  // Create reusable transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // Gmail SMTP uses TLS on port 587, so secure=false
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Verify SMTP connection (correct placement)
  transporter.verify((error, success) => {
    if (error) {
      console.error('SMTP Connection Error:', error);
    } else {
      console.log('SMTP Server is ready to send emails', success);
    }
  });

  // Send email
  await transporter.sendMail({
    from: `"E-Commerce App" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Email Verification - Your OTP Code',
    html: otpEmailTemplate(otp),
  });
}
