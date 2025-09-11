import { Router } from 'express';

import {
  createPost,
  getBusinessPosts,
  getCurrentUserPosts,
  getPost,
  updatePost,
} from '../../controllers/post.controller';
import isAuthenticated from '../../middlewares/isAuthenticated';
import validate from '../../middlewares/validate';
import { OptionalPostSchema, PostSchema } from '../../validation/post.validate';
import { IdSchema } from '../../validation/api.validate';

const router = Router();

router.use(isAuthenticated);

router.route('/').post(validate(PostSchema), createPost);
router.route('/me').get(getCurrentUserPosts);
router.route('/business/:id').get(validate(IdSchema), getBusinessPosts);
router
  .route('/:id')
  .all(validate(IdSchema))
  .get(getPost)
  .patch(validate(OptionalPostSchema), updatePost);

export const postRoutes = router;
