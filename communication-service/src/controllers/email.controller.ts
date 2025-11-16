import { Request, Response } from 'express';
import { sendOtpEmail } from '../services/email.service';

export async function sendOtpEmailController(req: Request, res: Response) {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        saveStatus: false,
        message: 'Email and OTP are required',
      });
    }

    await sendOtpEmail(email, otp);

    return res.status(200).json({
      saveStatus: true,
      message: 'OTP email sent successfully',
    });
  } catch (error) {
    console.error('Error sending OTP email:', error);
    return res.status(500).json({
        saveStatus: false,
      message: 'Failed to send OTP email',
    });
  }
}
