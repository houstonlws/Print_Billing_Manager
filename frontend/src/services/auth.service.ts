import Cookies from 'js-cookie';
import { getAxios } from '../config/axios.config';
import { User } from '../types/auth.types';

const axios = getAxios();

class AuthService {
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
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  static getUserData = async () => {
    try {
      const result = await axios.post(`/getUserData`);
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
      console.log('[authService] sending data to update user', data);
      const result = await axios.put('/updateUserData', data);
      if (result.status === 200) return true;
      return false;
    } catch (err) {
      return false;
    }
  };

  static getNotifications = async (id: string) => {
    try {
      const result = await axios.get(`/notifications/${id}`);
      if (result.status === 200) return result.data;
      return [];
    } catch (err) {
      return [];
    }
  };
}

export default AuthService;
