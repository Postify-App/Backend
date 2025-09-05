import { Router } from 'express';

import isAuthenticated from '../../middlewares/isAuthenticated';
import { getCurrentUserProfile } from '../../controllers/user.controller';

const router = Router();

router.get('/me', isAuthenticated, getCurrentUserProfile);

export const userRoutes = router;
