import { getAxios } from '../config/axios.config';

const axios = getAxios();

class TrackingService {
  static async getCurrentJobs(id?: string): Promise<any> {
    const result = await axios.get(
      `/protected/tracking/currentJobs/get${id ? '/' + id : ''}`
    );
    if (result.status === 200) return result.data;
    return [];
  }

  static async getJobHistory(id?: string): Promise<any> {
    const result = await axios.get(
      `/protected/tracking/jobHistory/get${id ? '/' + id : ''}`
    );
    if (result.status === 200) return result.data;
    return [];
  }
}

export default TrackingService;
