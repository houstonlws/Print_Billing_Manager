import connection from '../config/database.config';
import { MaintenanceRequest } from '../models/maintenance.model';

class MaintenanceDAO {
  static getMaintenanceRequests(id: string) {
    return new Promise<MaintenanceRequest[]>((resolve, reject) => {
      const query = `SELECT 
      printer_id,
      department_id,
      DATE_FORMAT(request_date, '%Y-%m-%d') as request_date,
      maintenance_type,
      description,
      status,
      DATE_FORMAT(resolved_date, '%Y-%m-%d') as resolved_date
      FROM maintenance_requests WHERE department_id=? ORDER BY request_date DESC`;
      connection.query(query, id, (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      });
    });
  }

  static getAllMaintenanceRequests() {
    return new Promise<MaintenanceRequest[]>((resolve, reject) => {
      const query = `SELECT id,
        printer_id,
        department_id,
        DATE_FORMAT(request_date, '%Y-%m-%d') as request_date,
        maintenance_type,
        description,
        status,
        DATE_FORMAT(resolved_date, '%Y-%m-%d') as resolved_date
        FROM maintenance_requests ORDER BY request_date DESC;`;
      connection.query(query, (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      });
    });
  }

  static addMaintenanceRequest(request: MaintenanceRequest) {
    return new Promise<any>((resolve, reject) => {
      const {
        printer_id,
        request_date,
        maintenance_type,
        description,
        department_id,
      } = request;
      const query = `INSERT INTO maintenance_requests
            (printer_id,
            department_id,
            request_date,
            maintenance_type,
            description,
            status)
            VALUES
            (?,?,?,?,?,'Pending');`;
      connection.query(
        query,
        [
          printer_id,
          department_id,
          request_date,
          maintenance_type,
          description,
        ],
        (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            reject(err);
          }
        }
      );
    });
  }

  static updateStatus(id: string, status: string) {
    return new Promise<MaintenanceRequest[]>((resolve, reject) => {
      const query = `UPDATE maintenance_requests SET status=? WHERE id=?`;
      connection.query(query, [status, id], (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      });
    });
  }
}

export default MaintenanceDAO;
