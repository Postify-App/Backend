import { Router } from 'express';
import isAuthenticated from '../../middlewares/isAuthenticated';
import { createBusiness } from '../../controllers/business.controller';

const router = Router();

router.route('/').post(isAuthenticated, createBusiness);

export const businessRouter = router;
