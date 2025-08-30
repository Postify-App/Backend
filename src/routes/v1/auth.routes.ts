import { Router } from 'express';

import validate from '../../middlewares/validate';
import {
  login,
  refreshToken,
  sendOTP,
} from '../../controllers/auth.controller';
import {
  loginSchema,
  OTPSchema,
  refreshTokenSchema,
} from '../../validation/auth.validate';
import rateLimit from 'express-rate-limit';

const router = Router();

const strictLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 5,
  message: 'You reached your limit, Please try again later.',
});

router.post('/', validate(loginSchema), sendOTP);
router.post('/login', validate(OTPSchema), strictLimiter, login);
router.post('/refresh-token', validate(refreshTokenSchema), refreshToken);

export const authRoutes = router;
