import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/auth.model';
import authDao from '../dao/auth.dao';

class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const user: User = req.body;
      const result = await authDao.register(user);
      user.id = result.insertId;
      await authDao.addUserData(user);
      res.json();
    } catch (err) {
      res.status(401).json();
    }
  }

  static async login(req: Request, res: Response) {
    const origin = `[${req.headers.host}${req.originalUrl}]`;
    const user = req.body as User;
    try {
      const validationResult = await authDao.login(user);
      if (validationResult?.length > 0) {
        console.log(origin + 'login success');
        const authData = await authDao.getUserData(validationResult[0].id);
        const refreshToken = jwt.sign(
          { ...authData[0] },
          process.env.REFRESH_TOKEN_SECRET as string,
          { expiresIn: '15m' }
        );
        res.cookie('refreshToken', refreshToken).json('login success');
      } else {
        console.log(origin + 'login fail, wrong username or password');
        res.status(403).json('invalid login details');
      }
    } catch (error) {
      console.log(origin + 'login fail, server error');
      res.status(500).json('internal server error');
    }
  }

  static refreshToken(req: Request, res: Response) {
    const oldToken: string = req.cookies['refreshToken'];
    try {
      const user = jwt.verify(
        oldToken,
        process.env.REFRESH_TOKEN_SECRET as string
      );
      const { id, email, department_id, firstName, lastName, phone, iat, exp } =
        user as jwt.JwtPayload;
      if (iat && exp && iat < exp) {
        const newToken = jwt.sign(
          {
            id: id,
            email: email,
            department_id: department_id,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
          },
          process.env.REFRESH_TOKEN_SECRET as string,
          { expiresIn: '15m' }
        );
        res.cookie('refreshToken', newToken).json('token valid');
      } else {
        res.status(401).json('invalid token');
      }
    } catch (err) {
      res.status(401).json('invalid token');
    }
  }

  static async getUserData(req: Request, res: Response) {
    const user = req.body.tokenData;
    const result = await authDao.getUserData(user.id);
    res.json(result[0]);
  }

  static async updateUserData(req: Request, res: Response) {
    const id = req.body.tokenData.id;
    const result = await authDao.updateUserData(id, req.body);
    if (result) {
      res.json('updated user data');
    } else {
      res.status(400).json('error updating user data');
    }
  }

  static async getNotifications(req: Request, res: Response) {
    const id = req.params.id;
    const result = await authDao.getNotifications(id);
    if (result) {
      res.json(result);
    } else {
      res.status(400).json('error getting user notifications');
    }
  }
}

export default AuthController;
