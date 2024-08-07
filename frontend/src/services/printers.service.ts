import { getAxios } from '../config/axios.config';
import { MaintenanceRequest, Metric, Printer } from '../types/printer.types';

const axios = getAxios();

class PrintersService {
  static async getDepartmentPrinters(depId: string): Promise<Printer[]> {
    const result = await axios.get(`/printers/${depId}`);
    if (result.status === 200) {
      return result.data;
    }
    return [];
  }

  static async getDepartmentMetrics(depId: string): Promise<Metric[]> {
    const result = await axios.get(`/metrics/${depId}`);
    if (result.status === 200) {
      return result.data;
    }
    return [];
  }

  static async getAllMetrics(): Promise<Metric[]> {
    const result = await axios.get(`/metrics`);
    if (result.status === 200) {
      return result.data;
    }
    return [];
  }

  static async deletePrinter(id: string) {
    const result = await axios.delete(`/printer/${id}`);
    if (result.status === 200) {
      return true;
    }
    return false;
  }

  static async updatePrinter(printer: Printer) {
    const result = await axios.put('/printer', printer);
    if (result.status === 200) {
      return true;
    }
    return false;
  }

  static async getAllPrinters(): Promise<Printer[]> {
    const result = await axios.get('/allPrinters');
    if (result.status === 200) return result.data;
    return [];
  }

  static async addPrinter(printer: Printer): Promise<any> {
    const result = await axios.post('/printer', printer);
    if (result.status === 200) return true;
    return false;
  }

  static async getMaintenanceRequests(
    depId: string
  ): Promise<MaintenanceRequest[]> {
    const result = await axios.get(`/maintenance/${depId}`);
    if (result.status === 200) return result.data;
    return [];
  }

  static async getAllMaintenanceRequests(): Promise<MaintenanceRequest[]> {
    const result = await axios.get(`/maintenance`);
    if (result.status === 200) return result.data;
    return [];
  }

  static async addMaintenanceRequest(
    request: MaintenanceRequest
  ): Promise<any> {
    const result = await axios.post('/maintenance', request);
    if (result.status === 200) return result.data;
    return [];
  }

  static async updateMaintenanceRequest(
    request: MaintenanceRequest
  ): Promise<any> {
    const result = await axios.put(`/maintenance/${request.id}`, request);
    if (result.status === 200) return result.data;
    return [];
  }
}

export default PrintersService;
