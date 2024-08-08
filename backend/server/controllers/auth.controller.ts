import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/auth.model';
import authDao from '../dao/auth.dao';

class AuthController {
  static updateUserType = async (req: Request, res: Response) => {
    try {
      const users: string[] = req.body;
      await authDao.updateUserType(users);
      res.json('success');
    } catch (err) {
      res.status(401).json();
    }
  };
  static async register(req: Request, res: Response) {
    try {
      const user: User = req.body;
      const result = await authDao.register(user);
      user.id = result.insertId;
      await authDao.addUserData(user);
      res.json('user added successfully');
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
        const user = (
          await authDao.getUserData(validationResult[0].id)
        ).shift();
        console.log(origin + 'login success');
        const refreshToken = jwt.sign(
          { ...user },
          process.env.REFRESH_TOKEN_SECRET as string,
          { expiresIn: '15m' }
        );
        res.cookie('refreshToken', refreshToken).json(user);
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
      const tokenData = jwt.verify(
        oldToken,
        process.env.REFRESH_TOKEN_SECRET as string
      );
      const {
        id,
        email,
        department_id,
        firstName,
        lastName,
        phone,
        type,
        iat,
        exp,
      } = tokenData as jwt.JwtPayload;
      if (iat && exp && iat < exp) {
        const newToken = jwt.sign(
          {
            id: id,
            email: email,
            department_id: department_id,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            type: type,
          },
          process.env.REFRESH_TOKEN_SECRET as string,
          { expiresIn: '15m' }
        );
        res.cookie('refreshToken', newToken).json({
          id: id,
          email: email,
          department_id: department_id,
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          type: type,
        });
      } else {
        res.status(401).json('invalid token');
      }
    } catch (err) {
      res.status(401).json('invalid token');
    }
  }

  static async getUserData(req: Request, res: Response) {
    const id = req.params.id;
    const result = (await authDao.getUserData(id)).shift();
    res.json(result);
  }

  static async updateUserData(req: Request, res: Response) {
    const id = req.body.tokenData.id;
    const result = await authDao.updateUserData(id, req.body);
    if (result) {
      const user = (await authDao.getUserData(id)).shift();
      const refreshToken = jwt.sign(
        { ...user },
        process.env.REFRESH_TOKEN_SECRET as string,
        { expiresIn: '15m' }
      );
      res.cookie('refreshToken', refreshToken).json(user);
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

  static async getAllUsers(req: Request, res: Response) {
    const id = req.params.id;
    const result = await authDao.getAllUsers(req.body.tokenData.id);
    if (result) {
      res.json(result);
    } else {
      res.status(400).json('error getting users');
    }
  }
}

export default AuthController;