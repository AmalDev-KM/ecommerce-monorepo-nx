import { Router } from 'express';
import { sendOtpEmailController } from '../controllers/email.controller';

const router = Router();

router.post('/send-otp', sendOtpEmailController);

export const emailRoutes = router;
