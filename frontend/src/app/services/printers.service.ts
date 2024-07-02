import { getAxios } from "../utilities/axios.config"
import { Metric, Printer } from "../types/printer.types"

const axios = getAxios()

class PrintersService {

    static async getDepartmentPrinters():Promise<Printer[]>{
        const result = await axios.get('/printers')
        if(result.status === 200) {
            return result.data
        }
        else return []
    }

    static async getDepartmentMetrics(printerIds: string[]):Promise<Metric[]>{
        const result = await axios.post('/metrics', {printerIds: printerIds})
        if(result.status === 200) {
            return result.data
        }
        else return []
    }

    static async deletePrinter(id: string){
        const result = await axios.delete(`/printer/${id}`)
        if(result.status === 200) {
            return true
        }
        else return false
    }

    static async updatePrinter(printer: Printer){
        const result = await axios.put('/printer', printer)
        if(result.status === 200) {
            return true
        }
        else return false
    }

    static async getAllPrinters():Promise<Printer[]>{
        const result = await axios.get('/printers')
        if(result.status === 200) return result.data
        else return []
    }

    static async addPrinter(printer: Printer):Promise<any>{
        const result = await axios.post('/printer', printer)
        if(result.status === 200) return true
        else return false
    }

}

export default PrintersService