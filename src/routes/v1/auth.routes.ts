import { Router } from 'express';

import validate from '../../middlewares/validate';
import { login } from '../../controllers/auth.controller';
import { loginSchema } from '../../validation/auth.validate';

const router = Router();
router.post('/', validate(loginSchema), login);

export const authRoutes = router;
