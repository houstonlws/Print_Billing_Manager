import { User } from '../models/auth.model';
import connection from '../config/database.config';
import { MaintenanceRequest } from '../models/maintenance.model';

export default class authDao {
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
            } ORDER BY notification_date DESC`;
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

  static async getAllData(id?: string) {
    return await new Promise<any>((resolve, reject) => {
      const query = `SELECT source, JSON_ARRAYAGG(data) AS data 
      FROM (SELECT 'notifications' AS source,
      JSON_OBJECT(
        'id', id,
        'department_id', department_id,
        'maintenance_id', maintenance_id,
        'notification_date', DATE_FORMAT(notification_date, '%Y-%m-%d'),
        'message', message,
        'is_read', is_read
      ) AS data
      FROM notifications
      ${id ? 'WHERE department_id=?' : 'WHERE maintenance_id IS NOT NULL'}
      UNION ALL SELECT 
      'printers' AS source,
      JSON_OBJECT(
        'id', id,
        'department_id', department_id,
        'serial_number', serial_number,
        'model', model,
        'brand', brand,
        'location', location,
        'installation_date', DATE_FORMAT(installation_date, '%Y-%m-%d'),
        'warranty_expiry_date', DATE_FORMAT(warranty_expiry_date, '%Y-%m-%d'),
        'ip_address', ip_address,
        'mac_address', mac_address,
        'firmware_version', firmware_version
      ) AS data 
      FROM printers
      ${id ? 'WHERE department_id=?' : ''}
      UNION ALL SELECT 
      'maintenance_requests' AS source,
      JSON_OBJECT(
        'id', id,
        'department_id', department_id,
        'printer_id', printer_id,
        'request_date', DATE_FORMAT(request_date, '%Y-%m-%d'),
        'maintenance_type', maintenance_type,
        'description', description,
        'status', status,
        'resolved_date', DATE_FORMAT(resolved_date, '%Y-%m-%d')
      ) AS data
      FROM maintenance_requests
      ${id ? 'WHERE department_id=?' : ''}
      UNION ALL SELECT 
      'department_metrics' AS source,
      JSON_OBJECT(
        'id', id,
        'department_id', department_id,
        'printer_id', printer_id,
        'total_pages_printed', total_pages_printed,
        'monthly_print_volume', monthly_print_volume,
        'total_print_jobs', total_print_jobs,
        'monthly_print_jobs', monthly_print_jobs,
        'toner_levels', toner_levels,
        'toner_usage_monthly', toner_usage_monthly,
        'paper_levels', paper_levels,
        'paper_usage_monthly', paper_usage_monthly,
        'total_color_pages_printed', total_color_pages_printed,
        'total_color_pages_last_billing', total_color_pages_last_billing,
        'total_bw_pages_printed', total_bw_pages_printed,
        'total_bw_pages_last_billing', total_bw_pages_last_billing
      ) AS data
      FROM department_metrics
      ${id ? 'WHERE department_id=?' : ''}
      ${
        id
          ? ''
          : `UNION ALL SELECT
      'users' as source,
      JSON_OBJECT(
        'id', id,
        'email', email,
        'department_id', department_id,
        'type',type
      ) as data
      FROM users`
      }
      ) as all_data 
      GROUP BY source;`;
      connection.query(query, [id, id, id, id], (err, res) => {
        if (err) {
          console.log(err.message);
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

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
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  }
}
