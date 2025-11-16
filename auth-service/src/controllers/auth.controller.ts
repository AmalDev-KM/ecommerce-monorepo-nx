import { Request, Response } from 'express';
import { loginUser, registerUser } from '../services/auth.service';
import { createAndStoreOTP, sendVerificationEmail, verifyOTP } from '../services/otp.service';

//register a new user
export async function register(req: Request, res: Response) {
  try {
    const { name, email, password, role } = req.body;

    // Validate input
    if (!name) {
      return res.status(400).json({
        message: 'Name is required',
      });
    }
    if (!email) {
      return res.status(400).json({
        status: false,
        message: 'Email is required',
      });
    }
    if (!password) {
      return res.status(400).json({
        status: false,
        message: 'Password is required',
      });
    }

    // Register user
    const user = await registerUser(
      name,
      email.toLowerCase(),
      password,
      role || 'customer'
    );

    //create and store OTP and send verification email
    const otp = await createAndStoreOTP(email.toLowerCase());

    //send otp email
    const response = await sendVerificationEmail(email.toLowerCase(), otp);
    console.log(response)

    // Respond with success
    return res.status(201).json({
      status: true,
      message: 'User registered successfully, An OTP has been sent to your email for verification',
      user,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

//login user
export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const { token, user } = await loginUser(email.toLowerCase(), password);

    // Set the httpOnly cookie
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

//verify otp controller
export async function verifyOtpController(req: Request, res: Response) {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
      });
    }

    const user = await verifyOTP(email, otp);

    return res.status(200).json({
      message: "Email verified successfully, You can log in to your account now",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        isEmailVerified: user.isEmailVerified,
        isActive: user.isActive,
      },
    });
  } catch (err) {
    return res.status(400).json({
      message: err instanceof Error ? err.message : "Verification failed",
    });
  }
}