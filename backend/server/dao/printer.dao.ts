import connection from '../config/database.config';
import { Metric, Printer } from '../models/printer.model';

class PrinterDao {
  static async getAllPrinters() {
    return await new Promise<any>((resolve, reject) => {
      const query = `SELECT * FROM printers;`;
      connection.query(query, (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          console.log('get all printers error', err);
          reject(err);
        }
      });
    });
  }

  static async getJobHistory(id?: string) {
    return await new Promise<any>((resolve, reject) => {
      const query = `SELECT YEAR(date) as year, MONTH(date) as month, JSON_ARRAYAGG(data) AS jobs
      FROM (
      SELECT date, JSON_OBJECT(
        'id', id, 
          'printer_id', printer_id,
          'department_id', department_id,
          'date', date,
          'title', title, 
          'pages', pages,
          'color_pages', color_pages,
          'black_and_white_pages', black_and_white_pages
      ) as data
      FROM jobs
      ${id ? 'WHERE department_id=?' : ''}
      ) as subquery
      GROUP BY YEAR(date), MONTH(date)`;
      connection.query(query, id, (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          console.log('get all printers error', err.message);
          reject(err);
        }
      });
    });
  }

  static async getDepartmentPrinters(id: string) {
    return await new Promise<Printer[]>((resolve, reject) => {
      const query = `SELECT 
    id,
    serial_number,
    model,
    brand,
    location,
    DATE_FORMAT(installation_date, '%Y-%c-%d') as installation_date,
    DATE_FORMAT(warranty_expiry_date, '%Y-%c-%d') as warranty_expiry_date,
    ip_address,
    mac_address,
    firmware_version,
    department_id
    FROM
    printers
    WHERE department_id=?`;
      connection.query(query, id, (err, res) => {
        if (!err) resolve(res);
        else reject(err);
      });
    });
  }

  static async getDepartmentMetrics(depId: string) {
    return await new Promise<Metric[]>((resolve, reject) => {
      const query = `SELECT * FROM department_metrics WHERE department_id =?`;
      connection.query(query, depId, (err, res) => {
        if (!err) resolve(res);
        else reject(err);
      });
    });
  }

  static async getAllMetrics() {
    return await new Promise<Metric[]>((resolve, reject) => {
      const query = `SELECT * FROM department_metrics`;
      connection.query(query, (err, res) => {
        if (!err) resolve(res);
        else reject(err);
      });
    });
  }

  static async updatePrinter(printer: Printer) {
    return await new Promise((resolve, reject) => {
      const {
        serial_number,
        model,
        brand,
        location,
        installation_date,
        warranty_expiry_date,
        ip_address,
        mac_address,
        firmware_version,
        id,
      } = printer;
      const query = `UPDATE printers
                        SET
                        serial_number = ?,
                        model =?,
                        brand = ?,
                        location = ?,
                        installation_date = ?,
                        warranty_expiry_date = ?,
                        ip_address = ?,
                        mac_address = ?,
                        firmware_version = ?
                        WHERE id = ?;`;
      connection.query(
        query,
        [
          serial_number,
          model,
          brand,
          location,
          installation_date,
          warranty_expiry_date,
          ip_address,
          mac_address,
          firmware_version,
          id,
        ],
        (err, res) => {
          if (!err) {
            console.log('success update printer', res);
            resolve(res);
          } else {
            console.log('error update printer', err);
            reject(err);
          }
        }
      );
    });
  }

  static async deletePrinter(id: string) {
    return await new Promise<any>((resolve, reject) => {
      const query = `DELETE FROM printers WHERE id=?;`;
      connection.query(query, id, (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          console.log('delete printer error', err);
          reject(err);
        }
      });
    });
  }

  static async addPrinter(printer: Printer) {
    return await new Promise<any>((resolve, reject) => {
      const {
        serial_number,
        model,
        brand,
        location,
        installation_date,
        warranty_expiry_date,
        ip_address,
        mac_address,
        firmware_version,
        department_id,
      } = printer;
      const query = `INSERT INTO printers
        (serial_number,
        model,
        brand,
        location,
        installation_date,
        warranty_expiry_date,
        ip_address,
        mac_address,
        firmware_version, 
        department_id)
        VALUES
        (?,?,?,?,?,?,?,?,?,?);`;
      connection.query(
        query,
        [
          serial_number,
          model,
          brand,
          location,
          installation_date,
          warranty_expiry_date,
          ip_address,
          mac_address,
          firmware_version,
          department_id,
        ],
        (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            console.log('add printer error', err);
            reject(err);
          }
        }
      );
    });
  }
}

export default PrinterDao;
