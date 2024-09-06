import { getAxios } from '../config/axios.config';

const axios = getAxios();

class TrackingService {
  static async getCurrentJobs(id?: string): Promise<any> {
    const result = await axios.get(
      `/protected/tracking/currentJobs${id ? '/' + id : ''}`
    );
    if (result.status === 200) return result.data;
    return [];
  }

  static async getJobHistory(id?: string): Promise<any> {
    const result = await axios.get(
      `/protected/tracking/jobHistory${id ? '/' + id : ''}`
    );
    if (result.status === 200) return result.data;
    return [];
  }

  static async getCurrentTotals(id?: string): Promise<any> {
    const result = await axios.get(
      `/protected/tracking/currentJobs/totals${id ? '/' + id : ''}`
    );
    if (result.status === 200) return result.data;
    return null;
  }

  static async getJobHistoryTotals(id?: string): Promise<any> {
    const result = await axios.get(
      `/protected/tracking/jobHistory/totals${id ? '/' + id : ''}`
    );
    if (result.status === 200) return result.data;
    return null;
  }

  static async getBillingPeriods(id?: string): Promise<any> {
    const result = await axios.get(
      `/protected/tracking/billingPeriods${id ? '/' + id : ''}`
    );
    if (result.status === 200) return result.data;
    return null;
  }

  static async getCurrentBillingPeriod(): Promise<any> {
    const result = await axios.get(
      `/protected/tracking/billingPeriods/current`
    );
    if (result.status === 200) return result.data;
    return null;
  }

  static async getJobsByBillingPeriod(
    bpId: string,
    depId?: string
  ): Promise<any> {
    const result = await axios.get(
      `/protected/tracking/jobs?bpId=${bpId}${!!depId ? '&depId=' + depId : ''}`
    );
    if (result.status === 200) return result.data;
    return null;
  }
}

export default TrackingService;
