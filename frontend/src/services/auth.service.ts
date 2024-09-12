import { getAxios } from '../config/axios.config';

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

  static logout = async () => {
    try {
      const result = await axios.get('/logout');
      if (result.status === 200) {
        return result.data;
      }
      return false;
    } catch (error: any) {
      console.log(error.message);
      return false;
    }
  };
}

export default AuthService;
