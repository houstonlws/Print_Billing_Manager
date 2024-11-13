import { getAxios } from '../config/axios.config';

const axios = getAxios();

class BillingService {
  static getDepartmentInvoiceHistory = async (depId?: string) => {
    try {
      const result = await axios.get(
        `/protected/billing/history${depId ? '/' + depId : ''}`
      );
      if (result.status === 200) return result.data;
      return false;
    } catch (error) {
      return false;
    }
  };

  static getCurrentInvoice = async (depId?: string) => {
    try {
      const result = await axios.get(`/protected/billing/current/${depId}`);
      if (result.status === 200) return result.data;
      return false;
    } catch (error) {
      return false;
    }
  };
}
export default BillingService;
