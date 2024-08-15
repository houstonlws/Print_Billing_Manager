import { Router } from 'express';
import MaintenanceController from '../controllers/maintenance.controller';
import validateToken from '../middleware/validate-token.middleware';
const router = Router();

router.use(
  '/maintenance',
  validateToken,
  router.get('/:id', MaintenanceController.getMaintenanceRequests),
  router.get('', MaintenanceController.getAllMaintenanceRequests),
  router.post('', MaintenanceController.addMaintenanceRequest),
  router.put('/:id', MaintenanceController.updateStatus)
);

export default router;
