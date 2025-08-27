import { Router } from 'express';

import validate from '../../middlewares/validate';
import { login, sendOTP } from '../../controllers/auth.controller';
import { loginSchema, OTPSchema } from '../../validation/auth.validate';

const router = Router();

router.post('/', validate(loginSchema), sendOTP);
router.post('/login', validate(OTPSchema), login);

export const authRoutes = router;
