import { getAxios } from "../../../../../utilities/axios.config"
import { Printer } from "./printer.model"

const axios = getAxios()

class PrintersService {

    static async getDepartmentPrinters():Promise<Printer[]>{
        const result = await axios.get('/printers')
        if(result.status === 200) {
            return result.data
        }
        else return []
    }

    static async getAllPrinters():Promise<Printer[]>{
        const result = await axios.get('/printers')
        if(result.status === 200) return result.data
        else return []
    }

}

export default PrintersService