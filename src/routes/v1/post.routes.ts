import { Router } from 'express';

import { createPost } from '../../controllers/post.controller';
import isAuthenticated from '../../middlewares/isAuthenticated';

const router = Router();

router.use(isAuthenticated);

router.route('/').post(createPost);

export const postRoutes = router;
