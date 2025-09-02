import { Router } from 'express';

import validate from '../../middlewares/validate';
import {
  googleCallbackHandler,
  login,
  redditCallbackHandler,
  redditLogin,
  refreshToken,
  sendOTP,
} from '../../controllers/auth.controller';
import {
  loginSchema,
  OTPSchema,
  refreshTokenSchema,
} from '../../validation/auth.validate';
import rateLimit from 'express-rate-limit';
import passport from '../../config/passport';
import isAuthenticated from '../../middlewares/isAuthenticated';

const router = Router();

const strictLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 5,
  message: 'You reached your limit, Please try again later.',
});

router.post('/', validate(loginSchema), sendOTP);
router.post('/login', validate(OTPSchema), strictLimiter, login);
router.post('/refresh-token', validate(refreshTokenSchema), refreshToken);
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/callback/google',
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: false,
  }),
  googleCallbackHandler
);

router.get('/reddit', isAuthenticated, redditLogin);
router.get('/reddit/callback', isAuthenticated, redditCallbackHandler);

export const authRoutes = router;
