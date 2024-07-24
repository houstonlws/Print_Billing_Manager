import { getAxios } from '../config/axios.config';
import { MaintenanceRequest } from '../types/maintenance.types';

const axios = getAxios();

class MaintenanceService {
  static async getMaintenanceRequests(
    printers: string[],
  ): Promise<MaintenanceRequest[]> {
    const result = await axios.post('/all-maintenance', printers);
    if (result.status === 200) return result.data;
    return [];
  }

  static async addMaintenanceRequest(
    request: MaintenanceRequest,
  ): Promise<any> {
    const result = await axios.post('/maintenance', request);
    if (result.status === 200) return result.data;
    return [];
  }
}

export default MaintenanceService;
