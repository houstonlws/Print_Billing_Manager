import { Request, Response } from 'express';
import BillingDAO from '../dao/billing.dao';

class BillingController {
  static async getDepartmentBillingHistory(req: Request, res: Response) {
    try {
      const result = await BillingDAO.getDepartmentBillingHistory(
        req.params.id
      );
      res.json(result);
    } catch (err) {
      res.status(401).json();
    }
  }
}

export default BillingController;
