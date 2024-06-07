import { Request, Response } from "express"
import PrinterDao from "./printer.dao"

class PrinterController {

    static async getDepartmentPrinters(req: Request, res: Response) {
        try {
            console.log('getting printers')
            const printers = await PrinterDao.getDepartmentPrinters(req.body.tokenData.id)
            res.json(printers)
        } catch (error) {
            res.status(400).json('problem getting printers ')
        }
    }

}

export default PrinterController