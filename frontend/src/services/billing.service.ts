import { getAxios } from '../config/axios.config';

const axios = getAxios();

class BillingService {
  static getDepartmentBillingHistory = async (depId: string | number) => {
    try {
      const result = await axios.get(`/getDepartmentBillingHistory/${depId}`);
      if (result.status === 200) return result.data;
      return false;
    } catch (error) {
      return false;
    }
  };
}
export default BillingService;
