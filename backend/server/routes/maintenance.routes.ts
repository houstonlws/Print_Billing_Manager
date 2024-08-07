import { Router } from 'express';
import MaintenanceController from '../controllers/maintenance.controller';
import validateToken from '../middleware/ValidateToken';
const router = Router();

router.get(
  '/maintenance/:id',
  validateToken,
  MaintenanceController.getMaintenanceRequests
);

router.get(
  '/maintenance',
  validateToken,
  MaintenanceController.getAllMaintenanceRequests
);

router.post(
  '/maintenance',
  validateToken,
  MaintenanceController.addMaintenanceRequest
);

export default router;
