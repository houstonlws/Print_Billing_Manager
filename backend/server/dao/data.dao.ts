import { Department } from "../models/data.model";
import connection from "../config/database.config";

class DataDAO{

    static async getDepartments(){
        return await new Promise<Department[]>((resolve, reject) => {
            const query = 'SELECT id, category, name FROM departments'
            connection.query(query, (err, res) => {
                if(!err) resolve(res)
                else reject(err)
            })
              
        })
    }

}

export default DataDAO
