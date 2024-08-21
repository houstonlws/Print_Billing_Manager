import { getAxios } from '../config/axios.config';
import { MaintenanceRequest, Metric, Printer } from '../types/printer.types';

const axios = getAxios();

class PrintersService {
  static async getDepartmentPrinters(depId: string): Promise<Printer[]> {
    const result = await axios.get(`/protected/printer/${depId}`);
    if (result.status === 200) {
      return result.data;
    }
    return [];
  }

  static async getDepartmentMetrics(depId: string): Promise<Metric[]> {
    const result = await axios.get(`/protected/printer/metrics/get/${depId}`);
    if (result.status === 200) {
      return result.data;
    }
    return [];
  }

  static async getAllMetrics(): Promise<Metric[]> {
    const result = await axios.get(`/protected/printer/metrics/get`);
    if (result.status === 200) {
      return result.data;
    }
    return [];
  }

  static async updatePrinter(printer: Printer) {
    const result = await axios.patch('/protected/printer/update', printer);
    if (result.status === 200) {
      return true;
    }
    return false;
  }

  static async getAllPrinters(): Promise<Printer[]> {
    const result = await axios.get('/protected/printer/get');
    if (result.status === 200) return result.data;
    return [];
  }

  static async addPrinter(printer: Printer): Promise<any> {
    const result = await axios.post('/protected/printer/add', printer);
    if (result.status === 200) return true;
    return false;
  }

  static async getMaintenanceRequests(
    depId: string
  ): Promise<MaintenanceRequest[]> {
    const result = await axios.get(`/protected/maintenance/get/${depId}`);
    if (result.status === 200) return result.data;
    return [];
  }

  static async getAllMaintenanceRequests(): Promise<MaintenanceRequest[]> {
    const result = await axios.get(`/protected/maintenance/get`);
    if (result.status === 200) return result.data;
    return [];
  }

  static async addMaintenanceRequest(
    request: MaintenanceRequest
  ): Promise<any> {
    const result = await axios.post('/protected/maintenance/add', request);
    if (result.status === 200) return result.data;
    return [];
  }

  static async updateMaintenanceRequest(
    id: string,
    status: string
  ): Promise<any> {
    const result = await axios.patch(
      `/protected/maintenance/update/${id}`,
      { status: status },
      { headers: { 'Content-Type': 'application/json' } }
    );
    if (result.status === 200) return true;
    return false;
  }
}

export default PrintersService;
