import { Router } from 'express';
import PrinterController from '../controllers/printer.controller';
import validateToken from '../middleware/ValidateToken';

const router = Router();

router.get('/', PrinterController.getAllPrinters);
router.put('/', PrinterController.updatePrinter);
router.post('/', PrinterController.addPrinter);
router.get('/metrics', PrinterController.getAllMetrics);
router.get('/:id', PrinterController.getDepartmentPrinters);
router.get('/metrics/:id', PrinterController.getDepartmentMetrics);

export default router;
