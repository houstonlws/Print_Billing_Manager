import { Request, Response } from "express"
import MaintenanceDAO from "../dao/maintenance.dao"

class MaintenanceController {

    static async getMaintenanceRequests(req: Request, res: Response){
        try {
            if(req.body?.length === 0) {
                res.json
            }
            const requests = await MaintenanceDAO.getMaintenanceRequests(req.body)
            res.json(requests)
        } catch (error) {
            res.status(400).json('failure')
        }
    }

    static async addMaintenanceRequest(req: Request, res: Response){
        try {
            console.log('adding request', req.body)
            const result = await MaintenanceDAO.addMaintenanceRequest(req.body)
            res.json('success')
        } catch (error) {
            res.status(400).json('failure')
        }
    }

}

export default MaintenanceController