import { Request, Response } from 'express';
import PrinterDao from '../dao/printer.dao';

class PrinterController {
  static async getAllPrinters(req: Request, res: Response) {
    try {
      const printers = await PrinterDao.getAllPrinters();
      res.json(printers);
    } catch (error) {
      res.status(400).json('error getting printers');
    }
  }

  static async getDepartmentPrinters(req: Request, res: Response) {
    try {
      const department_id = req.params.id;
      const printers = await PrinterDao.getDepartmentPrinters(department_id);
      res.json(printers);
    } catch (error) {
      res.status(400).json('no department selected');
    }
  }

  static async getDepartmentMetrics(req: Request, res: Response) {
    try {
      const depId = req.params.id;
      const metrics = await PrinterDao.getDepartmentMetrics(depId);
      res.json(metrics);
    } catch (error) {
      res.status(400).json('no department selected');
    }
  }

  static async updatePrinter(req: Request, res: Response) {
    try {
      console.log('[Printer Controller] updating printer');
      const printer = req.body;
      const result = await PrinterDao.updatePrinter(printer);
      res.json('success');
    } catch (error) {
      res.status(400).json('error');
    }
  }

  static async deletePrinter(req: Request, res: Response) {
    try {
      console.log('[printer controller] deleting printer');
      const id = req.params['id'];
      const result = await PrinterDao.deletePrinter(id);
      console.log('delete result', result);
      res.json('success');
    } catch (error) {
      res.status(400).json('error');
    }
  }

  static async addPrinter(req: Request, res: Response) {
    try {
      console.log('[printer controller] adding printer');
      req.body.department_id = req.body.tokenData['department_id'];
      const result = await PrinterDao.addPrinter(req.body);
      console.log('add result', result);
      res.json('success');
    } catch (error) {
      res.status(400).json('error');
    }
  }
}

export default PrinterController;
