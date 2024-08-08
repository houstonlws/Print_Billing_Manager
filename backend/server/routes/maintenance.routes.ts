import { Router } from 'express';
import MaintenanceController from '../controllers/maintenance.controller';
const router = Router();

router.get('/:id', MaintenanceController.getMaintenanceRequests);
router.get('', MaintenanceController.getAllMaintenanceRequests);
router.post('', MaintenanceController.addMaintenanceRequest);
router.put('/:id', MaintenanceController.updateStatus);

export default router;
