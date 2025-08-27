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

const router = Router();

router.post('/', validate(loginSchema), sendOTP);
router.post('/login', validate(OTPSchema), login);
router.post('/refresh-token', validate(refreshTokenSchema), refreshToken);

export const authRoutes = router;
