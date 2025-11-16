import { redis } from '../database/redis';
import { apiClient } from '../lib/axios';
import { User } from '../models/user.model';
import { generateOTP } from '../utils/otp';

// Function to create and store OTP
export async function createAndStoreOTP(email: string) {
  const otp = generateOTP();

  // Store OTP with 5 min expiration
  await redis.set(`otp:${email}`, otp, 'EX', 300);

  return otp;
}

// Function to send OTP via communication service
export async function sendVerificationEmail(email: string, otp: string) {
  try {
    const response = await apiClient.post('/api/email/send-otp', {
      email,
      otp,
    });

    if (response.status !== 200) {
      console.error('Communication service failed:', response.data);
      throw new Error('Failed to send verification email');
    }

    console.log('Email service responded:', response.data);
    return response.data;
  } catch (err) {
    console.error('Communication service error:', err);
    throw new Error('Communication service unreachable');
  }
}

// Function to verify OTP
export const verifyOTP = async (email: string, otp: string) => {
  // 1. Get stored OTP from Redis
  const storedOtp = await redis.get(`otp:${email}`);

  if (!storedOtp) {
    throw new Error('OTP expired or not found');
  }

  // 2. Compare OTPs
  if (storedOtp !== otp) {
    throw new Error('Invalid OTP');
  }

  // 3. Update user status
  const updatedUser = await User.findOneAndUpdate(
    { email },
    {
      isEmailVerified: true,
      isActive: true,
    },
    { new: true }
  );

  if (!updatedUser) {
    throw new Error('User not found');
  }

  // 4. Delete OTP from Redis (cleanup)
  await redis.del(`otp:${email}`);

  return updatedUser;
};
