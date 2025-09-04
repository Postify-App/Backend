import { Router } from 'express';
import { authRoutes } from './auth.routes';
import { redditRoutes } from './reddit.routes';
import { businessRoutes } from './business.routes';
import { mainTopicRoutes } from './mainTopic.routes';

const router = Router();
router.use('/auth', authRoutes);
router.use('/reddit', redditRoutes);
router.use('/business', businessRoutes);
router.use('/main-topic', mainTopicRoutes);

export const v1Routes = router;
