import connection from "../../config/database.config"
import { Printer } from "./printer.model"

class PrinterDao {

    static async getDepartmentPrinters(id:number){
        return await new Promise<Printer[]>((resolve, reject) => {
            const query = `SELECT * FROM printers WHERE department_id=?`
            connection.query(query, id, (err, res) => {
                if(!err) resolve(res)
                else reject(err)
            })
        
        })
    }

}

export default PrinterDao