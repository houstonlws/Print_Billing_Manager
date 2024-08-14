import { Router } from 'express';
import PrinterController from '../controllers/printer.controller';
import validateToken from '../middleware/ValidateToken';

const router = Router();
router.use(
  '/printer',
  router.get('/jobHistory', PrinterController.getJobHistory),
  router.get('/jobHistory/:id', PrinterController.getJobHistory),
  router.get('/currentJobs', PrinterController.getCurrentJobs),
  router.get('/currentJobs/:id', PrinterController.getCurrentJobs),
  router.get('/metrics', PrinterController.getAllMetrics),
  router.get('/:id', PrinterController.getDepartmentPrinters),
  router.get('/metrics/:id', PrinterController.getDepartmentMetrics),
  router.get('/', PrinterController.getAllPrinters),
  router.put('/', PrinterController.updatePrinter),
  router.post('/', PrinterController.addPrinter)
);

export default router;
