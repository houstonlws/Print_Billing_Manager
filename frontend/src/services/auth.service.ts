import Cookies from 'js-cookie';
import { getAxios } from '../config/axios.config';
import { User } from '../types/auth.types';

const axios = getAxios();

class AuthService {
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

  static updateUserType = async (users: string[]) => {
    try {
      const result = await axios.put('/userType', users);
      if (result.status === 200) {
        return true;
      } else return false;
    } catch (error) {
      return false;
    }
  };

  static getAllUsers = async (): Promise<User[]> => {
    try {
      const result = await axios.get('/getAllUsers');
      if (result.status === 200) {
        return result.data;
      } else return [];
    } catch (error) {
      return [];
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

  static login = async (email: string, password: string) => {
    try {
      const result = await axios.post('/login', {
        email,
        password,
      });
      if (result.status === 200) {
        document.cookie = Cookies.get('refreshToken') || '';
        return result.data;
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  static refreshToken = async () => {
    try {
      const result = await axios.get('/refreshToken');
      if (result.status === 200) {
        return result.data;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  static getUserData = async (id: string) => {
    try {
      const result = await axios.get(`/getUserData/${id}`);
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
      const result = await axios.put('/updateUserData', data);
      if (result.status === 200) return result.data as User;
      return false;
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
