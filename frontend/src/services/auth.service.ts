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
      const result = await axios.get(`/getAllData${depId ? '/' + depId : ''}`);
      if (result.status === 200) {
        return result.data;
      } else return false;
    } catch (error) {
      return false;
    }
  };

  static getUserData = async (id: string) => {
    try {
      const result = await axios.get(`/user/${id}`);
      if (result.status === 200) {
        return result;
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  static updateUserData = async (data: User) => {
    try {
      const result = await axios.patch(`/user/${data.id}`, data);
      if (result.status === 200) {
        return result.data;
      }
    } catch (err) {
      return false;
    }
  };

  static getNotifications = async (departmentId: string) => {
    try {
      const result = await axios.get(`/notifications/${departmentId}`);
      if (result.status === 200) return result.data;
      return [];
    } catch (err) {
      return [];
    }
  };
}

export default AuthService;
