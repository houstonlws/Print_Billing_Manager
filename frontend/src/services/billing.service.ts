import { getAxios } from '../config/axios.config';

const axios = getAxios();

class BillingService {
  static getDepartmentBillingHistory = async () => {
    try {
      const result = await axios.get('/getDepartmentBillingHistory');
      if (result.status === 200) return result.data;
      return [];
    } catch (error) {
      return [];
    }
  };
}
export default BillingService;
