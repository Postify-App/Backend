import { Router } from 'express';

import validate from '../../middlewares/validate';
import { IdSchema } from '../../validation/api.validate';
import {
  TitleSchema,
  OptionalTitleSchema,
} from '../../validation/cards.validation';
import {
  createMainGoal,
  deleteAllmainGoals,
  deleteMainGoal,
  getAllMainGoals,
  getMainGoalById,
  updateMainGoal,
} from '../../controllers/mainGoal.controller';

const router = Router();

router
  .route('/')
  .post(validate(TitleSchema), createMainGoal)
  .get(getAllMainGoals)
  .delete(deleteAllmainGoals);

router
  .route('/:id')
  .all(validate(IdSchema))
  .get(getMainGoalById)
  .patch(validate(OptionalTitleSchema), updateMainGoal)
  .delete(deleteMainGoal);

export const mainGoalRoutes = router;
