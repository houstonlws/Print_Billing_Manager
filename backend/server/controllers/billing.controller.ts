import { Request, Response } from 'express'
import BillingDAO from '../dao/billing.dao';

class BillingController {

    static async getDepartmentBillingHistory(req: Request, res: Response) {
        console.log('getting billing history for department', req.body.tokenData.department_id)
        try {
            const result = await BillingDAO.getDepartmentBillingHistory(req.body.tokenData.department_id)
            res.json(result)
        }catch(err){
            res.status(401).json()
        }
    }

}

export default BillingController