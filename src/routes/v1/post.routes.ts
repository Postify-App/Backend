import { Router } from 'express';

import {
  createPost,
  getBusinessPosts,
  getCurrentUserPosts,
  getPost,
  publishPost,
  updatePost,
} from '../../controllers/post.controller';
import isAuthenticated from '../../middlewares/isAuthenticated';
import validate from '../../middlewares/validate';
import {
  CreatePostSchema,
  OptionalPostSchema,
  PublishPostSchema,
} from '../../validation/post.validate';
import { IdSchema } from '../../validation/api.validate';
import { uploadFile } from '../../middlewares/upload';

const router = Router();

router.use(isAuthenticated);

router.route('/').post(validate(CreatePostSchema), createPost);

router.post(
  '/publish/:id',
  validate(IdSchema),
  uploadFile,
  validate(PublishPostSchema),
  publishPost
);

router.route('/me').get(getCurrentUserPosts);
router.route('/business/:id').get(validate(IdSchema), getBusinessPosts);
router
  .route('/:id')
  .all(validate(IdSchema))
  .get(getPost)
  .patch(validate(OptionalPostSchema), updatePost);

export const postRoutes = router;
