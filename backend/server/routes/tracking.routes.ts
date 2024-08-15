import { Router } from 'express';
import TrackingController from '../controllers/tracking.controller';
import validateToken from '../middleware/validate-token.middleware';

const router = Router();
router.use(
  '/tracking',
  validateToken,
  router.get('/jobHistory', TrackingController.getJobHistory),
  router.get('/jobHistory/:id', TrackingController.getJobHistory),
  router.get('/currentJobs', TrackingController.getCurrentJobs),
  router.get('/currentJobs/:id', TrackingController.getCurrentJobs)
);

export default router;
