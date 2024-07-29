import connection from '../config/database.config';
import { MaintenanceRequest } from '../models/maintenance.model';

class MaintenanceDAO {
  static getMaintenanceRequests(id: string) {
    return new Promise<MaintenanceRequest[]>((resolve, reject) => {
      const query = `SELECT * FROM department_maintenance_requests WHERE department_id=${id}`;
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
      const { printer_id, request_date, maintenance_type, description } =
        request;
      const query = `INSERT INTO maintenance_requests
            (printer_id,
            request_date,
            maintenance_type,
            description,
            status)
            VALUES
            (?,?,?,?,'Pending');`;
      connection.query(
        query,
        [printer_id, request_date, maintenance_type, description],
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
}

export default MaintenanceDAO;
