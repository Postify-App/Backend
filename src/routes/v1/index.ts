import { Router } from 'express';

import { authRoutes } from './auth.routes';
import { userRoutes } from './user.routes';
import { postRoutes } from './post.routes';
import { redditRoutes } from './reddit.routes';
import { mainGoalRoutes } from './mainGoal.routes';
import { businessRoutes } from './business.routes';
import { mainTopicRoutes } from './mainTopic.routes';
import { toneOfVoiceRoutes } from './toneOfVoice.routes';
import { targetAudienceRoutes } from './targetAudience.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/reddit', redditRoutes);
router.use('/business', businessRoutes);
router.use('/main-goal', mainGoalRoutes);
router.use('/main-topic', mainTopicRoutes);
router.use('/tone-of-voice', toneOfVoiceRoutes);
router.use('/target-audience', targetAudienceRoutes);

export const v1Routes = router;
