import authRoutes from './auth.routes';
import printerRoutes from './printer.routes';
import billingRoutes from './billing.routes';
import maintenanceRoutes from './maintenance.routes';
import trackingRoutes from './tracking.routes';

import { Router } from 'express';

const router = Router();

router.use(authRoutes);
router.use(printerRoutes);
router.use(billingRoutes);
router.use(maintenanceRoutes);
router.use(trackingRoutes);

export default router;
