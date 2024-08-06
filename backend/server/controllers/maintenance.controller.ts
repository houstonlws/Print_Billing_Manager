import { Request, Response } from 'express';
import MaintenanceDAO from '../dao/maintenance.dao';
import authDao from '../dao/auth.dao';

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
      const mr = req.body;
      const result = await MaintenanceDAO.addMaintenanceRequest(mr);
      if (result) {
        const notified = await authDao.createMaintenanceNotification(
          result.insertId,
          mr
        );
      }
      res.json('success');
    } catch (error) {
      res.status(400).json('failure');
    }
  }
}

export default MaintenanceController;
