import { Router } from 'express';

import validate from '../../middlewares/validate';
import { uploadLogo } from '../../middlewares/upload';
import isAuthenticated from '../../middlewares/isAuthenticated';
import {
  createBusiness,
  deleteBusiness,
  getBusinessById,
  getCurrentUserBusinesses,
  updateBusiness,
} from '../../controllers/business.controller';
import { BusinessSchema } from '../../validation/business.validate';
import { IdSchema } from '../../validation/api.validate';

const router = Router();

router.use(isAuthenticated);

router.route('/').post(uploadLogo, validate(BusinessSchema), createBusiness);

router.get('/me', getCurrentUserBusinesses);

router
  .route('/:id')
  .all(validate(IdSchema))
  .get(getBusinessById)
  .patch(uploadLogo, validate(BusinessSchema), updateBusiness)
  .delete(deleteBusiness);

export const businessRouter = router;
