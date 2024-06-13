import { Request, Response } from 'express'
import DataDAO from './data.dao';

class DataController {

    static async getDepartments(req: Request, res: Response){
        try {
            const result = await DataDAO.getDepartments()
            res.json(result)
        } catch (error) {
            res.status(500).json('problem getting departments')
        }
    }

}

export default DataController