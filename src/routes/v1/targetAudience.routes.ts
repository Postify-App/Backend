import { Router } from 'express';

import validate from '../../middlewares/validate';
import { IdSchema } from '../../validation/api.validate';
import {
  TitleSchema,
  OptionalTitleSchema,
} from '../../validation/cards.validate';
import {
  createTargetAudience,
  deleteAlltargetAudiences,
  deleteTargetAudience,
  getAllTargetAudiences,
  getTargetAudienceById,
  updateTargetAudience,
} from '../../controllers/targetAudience.controller';

const router = Router();

router
  .route('/')
  .post(validate(TitleSchema), createTargetAudience)
  .get(getAllTargetAudiences)
  .delete(deleteAlltargetAudiences);

router
  .route('/:id')
  .all(validate(IdSchema))
  .get(getTargetAudienceById)
  .patch(validate(OptionalTitleSchema), updateTargetAudience)
  .delete(deleteTargetAudience);

export const targetAudienceRoutes = router;
