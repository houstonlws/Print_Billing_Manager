import connection from "../config/database.config"
import { MaintenanceRequest } from "../models/maintenance.model"

class MaintenanceDAO {

    static getMaintenanceRequests(printers: string[]){
        return new Promise<MaintenanceRequest[]>((resolve, reject) => {
            const query = `SELECT 
            id,
            printer_id,
            DATE_FORMAT(request_date, '%Y-%c-%d') as request_date,
            maintenance_type,
            description,
            status,
            DATE_FORMAT(resolved_date, '%Y-%c-%d') as resolved_date
            FROM maintenance_requests
            WHERE printer_id IN (${printers.map(id => id).join(',')})`
            connection.query(query, (err, res) => {
                if(!err) {
                    resolve(res)
                }
                else {
                    reject(err)
                }
            })
        })
        
    }

    static addMaintenanceRequest(request: MaintenanceRequest){
        return new Promise<any>((resolve, reject) => {
            const { 
                printer_id, 
                request_date,
                maintenance_type,
                description
            } =request
            const query = `INSERT INTO maintenance_requests
            (printer_id,
            request_date,
            maintenance_type,
            description,
            status)
            VALUES
            (?,?,?,?,'Pending');`
            connection.query(query, [
                printer_id, 
                request_date,
                maintenance_type,
                description
            ], (err, res) => {
                if(!err) {
                    resolve(res)
                }
                else {
                    reject(err)
                }
            })
        })
        
    }

}

export default MaintenanceDAO