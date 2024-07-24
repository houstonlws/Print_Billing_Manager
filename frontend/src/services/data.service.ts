import { getAxios } from '../config/axios.config';

const axios = getAxios();

class DataService {
  static getDepartments = async () => {
    try {
      const result = await axios.get('/data/departments');
      return result.data;
    } catch (error) {
      return [];
    }
  };
}
export default DataService;
