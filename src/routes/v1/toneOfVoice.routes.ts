import { Router } from 'express';

import validate from '../../middlewares/validate';
import { uploadLogo } from '../../middlewares/upload';
import {
  createToneOfVoice,
  deleteAllToneOfVoices,
  deleteToneOfVoice,
  getAllToneOfVoices,
  getToneOfVoiceById,
  updateToneOfVoice,
} from '../../controllers/toneOfVoice.controller';
import { IdSchema } from '../../validation/api.validate';
import {
  TitleSchema,
  OptionalTitleSchema,
} from '../../validation/cards.validation';

const router = Router();

router
  .route('/')
  .post(uploadLogo, validate(TitleSchema), createToneOfVoice)
  .get(getAllToneOfVoices)
  .delete(deleteAllToneOfVoices);

router
  .route('/:id')
  .all(validate(IdSchema))
  .get(getToneOfVoiceById)
  .patch(uploadLogo, validate(OptionalTitleSchema), updateToneOfVoice)
  .delete(deleteToneOfVoice);

export const toneOfVoiceRoutes = router;
