import { Router } from 'express';
import { v1Routes } from './v1';

const router = Router();
router.use('/v1', v1Routes);
// router.use('/v2', v2Routes);

export const apiRoutes = router;
