import { Router } from 'express';
import { authRoutes } from './auth.routes';
import { redditRoutes } from './reddit.routes';
import { businessRouter } from './business.routes';

const router = Router();
router.use('/auth', authRoutes);
router.use('/reddit', redditRoutes);
router.use('/business', businessRouter);

export const v1Routes = router;
