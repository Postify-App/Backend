import { Router } from 'express';
import {
  createMainTopic,
  deleteAllTopics,
  deleteMainTopic,
  editMainTopic,
  getAllTopics,
  getTopic,
} from '../../controllers/mainTopic.controller';
import {
  MainTopicSchema,
  OptionalTopicSchema,
} from '../../validation/mainTopic.validate';
import validate from '../../middlewares/validate';
import { IdSchema } from '../../validation/api.validate';
import { uploadLogo } from '../../middlewares/upload';

const router = Router();

router
  .route('/')
  .post(uploadLogo, validate(MainTopicSchema), createMainTopic)
  .get(getAllTopics)
  .delete(deleteAllTopics);

router
  .route('/:id')
  .all(validate(IdSchema))
  .get(getTopic)
  .patch(uploadLogo, validate(OptionalTopicSchema), editMainTopic)
  .delete(deleteMainTopic);

export const mainTopicRoutes = router;
