import { Router } from 'express';
import {
  login,
  register,
  verifyOtpController,
} from '../controllers/auth.controller';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verify-otp', verifyOtpController);

export const authRoutes = router;
