import { User } from '../models/auth.model';
import connection from '../config/database.config';
import { MaintenanceRequest } from '../models/maintenance.model';

export default class authDao {
  static async updateUserType(users: string[]) {
    const query = `UPDATE users SET type = (CASE 
    WHEN type = 'ADMIN' THEN 'USER'
    WHEN type = 'USER' THEN 'ADMIN'
    END) WHERE id IN (${users.map((id) => id).join(',')});`;
    return await new Promise<any>((res, rej) => {
      connection.query(query, (err, result) => {
        if (err) {
          rej(err);
        } else {
          res(result);
        }
      });
    });
  }
  static async register(user: User) {
    const query = 'INSERT INTO auth (email, password) VALUES (?, ?)';
    return await new Promise<any>((res, rej) => {
      connection.query(query, [user.email, user.password], (err, result) => {
        if (err) {
          rej(err);
        } else {
          res(result);
        }
      });
    });
  }

  static async login(user: User) {
    const query = `SELECT * FROM auth WHERE email=? AND password=?`;
    return await new Promise<User[]>((resolve, reject) => {
      connection.query(query, [user.email, user.password], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  static async getTokenData(email: string) {
    const query = `SELECT id, email FROM auth WHERE email=?`;
    return await new Promise<User[]>((resolve, reject) => {
      connection.query(query, email, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  static async addUserData(user: User) {
    return await new Promise<User>((resolve, reject) => {
      const query = `INSERT INTO users (id, email, type) VALUES (?, ?, 'USER')`;
      connection.query(query, [user.id, user.email], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  static async getUserData(id: string) {
    return await new Promise<User[]>((resolve, reject) => {
      const query = `SELECT * FROM users WHERE id=?`;
      connection.query(query, id, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  static async updateUserData(id: string, user: User) {
    return await new Promise<boolean>((resolve, reject) => {
      try {
        const email = user.email;
        const firstName = user.firstName || null;
        const lastName = user.lastName || null;
        const department_id = user.department_id || null;
        const phone = user.phone || null;
        const query = department_id
          ? `UPDATE users SET firstName=?, lastName=?, department_id=?, email=?, phone=? WHERE id=?`
          : `UPDATE users SET firstName=?, lastName=?, email=?, phone=? WHERE id=?`;
        const data = department_id
          ? [firstName, lastName, department_id, email, phone, id]
          : [firstName, lastName, email, phone, id];
        connection.query(query, data);
        resolve(true);
      } catch (error) {
        reject(false);
      }
    });
  }

  static async getNotifications(id: string) {
    return await new Promise<User[]>((resolve, reject) => {
      const query = `SELECT 
            id,
            department_id,
            maintenance_id,
            DATE_FORMAT(notification_date, '%Y-%m-%d') as notification_date,
            message,
            is_read
            FROM notifications
            WHERE ${
              id === '0' ? 'maintenance_id IS NOT NULL' : 'department_id=?'
            }`;
      connection.query(query, id, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  static async getAllUsers(id: string) {
    return await new Promise<User[]>((resolve, reject) => {
      const query = `SELECT * FROM users WHERE NOT id=?  `;
      connection.query(query, id, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  static async createMaintenanceNotification(
    id: string,
    mr: MaintenanceRequest
  ) {
    return await new Promise<User[]>((resolve, reject) => {
      const query = `INSERT INTO notifications 
      (department_id,
      maintenance_id,
      message)
      VALUES
      (?,?,?)`;
      connection.query(
        query,
        [mr.department_id, id, mr.description],
        (err, res) => {
          if (err) {
            console.log('error creating notification', err.message);
            reject(err);
          } else {
            console.log('success creating notification');
            resolve(res);
          }
        }
      );
    });
  }
}
