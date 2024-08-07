import { Router } from 'express';
import PrinterController from '../controllers/printer.controller';
import validateToken from '../middleware/ValidateToken';

const router = Router();

router.get(
  '/printers/:id',
  validateToken,
  PrinterController.getDepartmentPrinters
);
router.get(
  '/metrics/:id',
  validateToken,
  PrinterController.getDepartmentMetrics
);
router.get('/metrics', validateToken, PrinterController.getAllMetrics);
router.put('/printer', validateToken, PrinterController.updatePrinter);
// router.delete('/printer/:id', validateToken, PrinterController.deletePrinter)
router.post('/printer', validateToken, PrinterController.addPrinter);
router.get('/allPrinters', validateToken, PrinterController.getAllPrinters);

export default router;
