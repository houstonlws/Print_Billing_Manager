import Cookies from 'js-cookie';
import { getAxios } from '../config/axios.config';
import { PriceConfig, User } from '../types';

const axios = getAxios();

class AuthService {
  static login = async (email: string, password: string) => {
    try {
      const result = await axios.post('/login', {
        email,
        password,
      });
      if (result.status === 200) {
        localStorage.setItem('accessToken', result.headers['authorization']);
        return result.data;
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  static register = async (email: string, password: string) => {
    try {
      const result = await axios.post('/register', {
        email,
        password,
      });
      if (result.status === 200) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  static refreshToken = async () => {
    try {
      const result = await axios.get('/refreshToken', {
        withCredentials: true,
      });
      if (result.status === 200) {
        return result.data;
      }
      return false;
    } catch (error: any) {
      console.log(error.message);
      return false;
    }
  };

  static getAllData = async () => {
    try {
      const result = await axios.get('/getAllData');
      if (result.status === 200) {
        return result.data;
      } else return false;
    } catch (error) {
      return false;
    }
  };

  static getAllDataUser = async (depId: string) => {
    try {
      const result = await axios.get(`/getAllData/${depId}`);
      if (result.status === 200) {
        return result.data;
      } else return false;
    } catch (error) {
      return false;
    }
  };

  static getUserData = async (id: string) => {
    try {
      const result = await axios.get(`/user/get/${id}`);
      if (result.status === 200) {
        return result;
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  static updateUserData = async (data: User): Promise<User | boolean> => {
    try {
      console.log('[authService] sending data to update user', data);
      const result = await axios.patch(`/user/update/${data.id}`, data);
      if (result.status === 200) return result.data as User;
      return true;
    } catch (err) {
      return false;
    }
  };

  static getNotifications = async (departmentId: string) => {
    try {
      const result = await axios.get(`/notifications/get/${departmentId}`);
      if (result.status === 200) return result.data;
      return [];
    } catch (err) {
      return [];
    }
  };

  static addPriceProfile = async (profile: PriceConfig) => {
    try {
      const result = await axios.post(
        `/protected/app/priceProfile/add`,
        profile
      );
      if (result.status === 200) {
        return result.data;
      } else return false;
    } catch (error) {
      return false;
    }
  };

  static setPriceProfile = async (id: string) => {
    try {
      const result = await axios.patch(`/protected/app/priceProfile/set/${id}`);
      if (result.status === 200) {
        return result.data;
      } else return false;
    } catch (error) {
      return false;
    }
  };

  static updateUserType = async (users: string[]) => {
    try {
      const result = await axios.patch('/user/type', users);
      if (result.status === 200) {
        return true;
      } else return false;
    } catch (error) {
      return false;
    }
  };

  static getAllUsers = async (): Promise<User[]> => {
    try {
      const result = await axios.get('/user/get/*');
      if (result.status === 200) {
        return result.data;
      } else return [];
    } catch (error) {
      return [];
    }
  };
}

export default AuthService;
