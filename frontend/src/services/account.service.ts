import { getAxios } from '../config/axios.config';
import { User } from '../types';

const axios = getAxios();
const prefix = '/protected/account';

class AccountService {
  static getAllData = async () => {
    try {
      const result = await axios.get(prefix + '/getAllData');
      if (result.status === 200) {
        return result.data;
      } else return false;
    } catch (error) {
      return false;
    }
  };

  static getAllDataUser = async (depId: string) => {
    try {
      const result = await axios.get(
        prefix + `/getAllData${depId ? '/' + depId : ''}`
      );
      if (result.status === 200) {
        return result.data;
      } else return false;
    } catch (error) {
      return false;
    }
  };

  static getUserData = async (id: string) => {
    try {
      const result = await axios.get(prefix + `/user/${id}`);
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
      const result = await axios.patch(prefix + `/user/${data.id}`, data);
      if (result.status === 200) {
        return result.data;
      }
    } catch (err) {
      return false;
    }
  };

  static getNotifications = async (departmentId?: string, unread?: boolean) => {
    try {
      const result = await axios.get(
        prefix +
          `/notifications${departmentId ? '/' + departmentId : ''}${unread ? '/unread' : ''}`
      );
      if (result.status === 200) return result.data;
      return [];
    } catch (err) {
      return [];
    }
  };

  static updateUserType = async (users: string[]) => {
    try {
      const result = await axios.patch(prefix + '/user/type', users);
      if (result.status === 200) {
        return true;
      } else return false;
    } catch (error) {
      return false;
    }
  };

  static getAllUsers = async (): Promise<User[]> => {
    try {
      const result = await axios.get(prefix + '/user/*');
      if (result.status === 200) {
        return result.data;
      } else return [];
    } catch (error) {
      return [];
    }
  };
}

export default AccountService;
