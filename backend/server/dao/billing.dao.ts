import connection from "../config/database.config";
import { Bill } from "../models/billing.model";

class BillingDAO{

    static async getDepartmentBillingHistory(id:string){
        return await new Promise<Bill[]>((resolve, reject) => {
            const query = `SELECT id,
            department_id,
            DATE_FORMAT(billing_cycle_start, '%Y-%m-%d') as billing_cycle_start,
            DATE_FORMAT(billing_cycle_end, '%Y-%m-%d') as billing_cycle_end, 
            total_charges,
            total_paper,
            total_color_pages,
            total_bw_pages,
            color_pages_charge,
            bw_pages_charge
            FROM billing 
            WHERE department_id=?`
            connection.query(query, id ,(err, res) => {
                if(!err) resolve(res)
                else reject(err)
            })
              
        })
    }

}

export default BillingDAO
