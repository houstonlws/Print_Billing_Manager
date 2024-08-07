import authRoutes from './auth.routes';
import printerRoutes from './printer.routes';
import billingRoutes from './billing.routes';
import maintenanceRoutes from './maintenance.routes';
import { Router } from 'express';
import validateToken from '../middleware/ValidateToken';

const router = Router();

router.use(authRoutes);
router.use('/printer', validateToken, printerRoutes);
router.use('/billing', validateToken, billingRoutes);
router.use('/maintenance', validateToken, maintenanceRoutes);

export default router;
