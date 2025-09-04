import { Router } from 'express';
import { authRoutes } from './auth.routes';
import { redditRoutes } from './reddit.routes';
import { mainGoalRoutes } from './mainGoal.routes';
import { businessRoutes } from './business.routes';
import { mainTopicRoutes } from './mainTopic.routes';
import { toneOfVoiceRoutes } from './toneOfVoice.routes';
import { targetAudienceRoutes } from './targetAudience.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/reddit', redditRoutes);
router.use('/business', businessRoutes);
router.use('/main-goal', mainGoalRoutes);
router.use('/main-topic', mainTopicRoutes);
router.use('/tone-of-voice', toneOfVoiceRoutes);
router.use('/target-audience', targetAudienceRoutes);

export const v1Routes = router;
