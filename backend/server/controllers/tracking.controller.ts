import { Request, Response } from 'express';
import TrackingDAO from '../dao/tracking.dao';
import { Job } from '../types';

class TrackingController {
  static async getCurrentJobs(req: Request, res: Response) {
    try {
      const department_id = req.params.id;
      const result: [{ data: string }] = await TrackingDAO.getCurrentJobs(
        department_id
      );

      let payload: Job[] = [];

      if (result)
        for (const obj of result) {
          const arr: any[] = JSON.parse(obj.data);
          while (arr?.length > 0) {
            payload.push(arr.pop());
          }
        }

      res.json(payload);
    } catch (error: any) {
      console.log(error.message);
      res.status(400).json('error');
    }
  }

  static async getJobHistory(req: Request, res: Response) {
    try {
      const department_id = req.params.id;
      const result: [{ year: string; month: string; jobs: string }] =
        await TrackingDAO.getJobHistory(department_id);

      let payload: { [key: string]: { [key: string]: any[] } } = {};

      if (result)
        for (const obj of result) {
          const arr: any[] = JSON.parse(obj.jobs);
          while (arr.length > 0) {
            const year = obj.year;
            const month = obj.month;
            if (!payload[year]) payload[year] = {};
            if (!payload[year][month]) payload[year][month] = [];
            payload[year][month].push(arr.pop());
          }
        }

      res.json(payload);
    } catch (error) {
      res.status(400).json('error');
    }
  }
}

export default TrackingController;
