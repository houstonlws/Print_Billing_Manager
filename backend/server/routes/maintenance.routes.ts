import { Router } from "express";
import MaintenanceController from "../controllers/maintenance.controller";
import validateToken from "../middleware/ValidateToken";
const router = Router()

router.post('/all-maintenance', validateToken, MaintenanceController.getMaintenanceRequests)
router.post('/maintenance', validateToken, MaintenanceController.addMaintenanceRequest)

export default router