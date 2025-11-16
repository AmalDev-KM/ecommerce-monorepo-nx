import bcrypt from 'bcrypt';
import { User } from '../models/user.model';
import { generateAccessToken } from '../utils/jwt';

//register a new user
export async function registerUser(
  name: string,
  email: string,
  password: string,
  role = 'customer'
) {
  // Check existing user
  const existing = await User.findOne({ email });
  if (existing) {
    throw new Error('Email already exists');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    isEmailVerified: false,
    isActive: false,
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isEmailVerified: user.isEmailVerified,
    isActive: user.isActive,
  };
}

//login user
export async function loginUser(email: string, password: string) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error('Invalid email or password');
  }

  if (!user.isActive || !user.isEmailVerified) {
    throw new Error('Account is not active or email not verified');
  }

  const token = generateAccessToken(user._id.toString());

  return {
    token, // token is returned so controller can set a cookie
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}
