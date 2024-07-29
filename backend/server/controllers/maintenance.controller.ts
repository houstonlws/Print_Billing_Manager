import { Request, Response } from 'express';
import MaintenanceDAO from '../dao/maintenance.dao';

class MaintenanceController {
  static async getMaintenanceRequests(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const requests = await MaintenanceDAO.getMaintenanceRequests(id);
      res.json(requests);
    } catch (error) {
      res.status(400).json('failure');
    }
  }

  static async addMaintenanceRequest(req: Request, res: Response) {
    try {
      console.log('adding request', req.body);
      const result = await MaintenanceDAO.addMaintenanceRequest(req.body);
      res.json('success');
    } catch (error) {
      res.status(400).json('failure');
    }
  }
}

export default MaintenanceController;
