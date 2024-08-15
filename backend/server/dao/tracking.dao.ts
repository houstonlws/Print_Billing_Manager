import connection from '../config/database.config';

class TrackingDAO {
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
          console.log('error', err.message);
          reject(err);
        }
      });
    });
  }

  static async getCurrentJobs(id?: string) {
    return await new Promise<any>((resolve, reject) => {
      const query = `SELECT JSON_ARRAYAGG(data) as data
          FROM( SELECT JSON_OBJECT(
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
          WHERE YEAR(date) = YEAR(CURRENT_DATE())
          AND MONTH(date) = MONTH(CURRENT_DATE())
          ${id ? 'AND department_id=?' : ''}
          ) as subquery`;
      connection.query(query, id, (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          console.log('error', err.message);
          reject(err);
        }
      });
    });
  }
}
export default TrackingDAO;
