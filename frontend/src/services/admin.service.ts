import { getAxios } from '../config/axios.config';
import { PriceConfig, User } from '../types';

const axios = getAxios();

class AdminService {
  static getPriceProfile = async () => {
    try {
      const result = await axios.get(`/protected/app/priceProfile`);
      if (result.status === 200) {
        return result.data;
      } else return false;
    } catch (error) {
      return false;
    }
  };

  static getPriceProfileList = async () => {
    try {
      const result = await axios.get(`/protected/app/priceProfile/list`);
      if (result.status === 200) {
        return result.data;
      } else return false;
    } catch (error) {
      return false;
    }
  };

  static addPriceProfile = async (profile: PriceConfig) => {
    try {
      const result = await axios.post(`/protected/app/priceProfile`, profile);
      if (result.status === 200) {
        return result.data;
      } else return false;
    } catch (error) {
      return false;
    }
  };

  static setPriceProfile = async (id: string) => {
    try {
      const result = await axios.patch(`/protected/app/priceProfile/${id}`);
      if (result.status === 200) {
        return result.data;
      } else return false;
    } catch (error) {
      return false;
    }
  };
}

export default AdminService;
