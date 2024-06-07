import { Request, Response } from 'express'
import authService from '../services/auth.service'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.model';

class AuthController {

    static async register(req: Request, res: Response) {
        try {
            const result = await authService.register(req.body)
            switch(result.status){
                case 'success': res.json(); break
                case 'fail': res.status(401).json(result.message); break
            }
        }catch(err){
            res.json('Internal server error').status(500)
        }
        
        
    }

    static async login(req: Request, res: Response){
        console.log('attempting login')
        const user = req.body
        const result = await authService.login(user)
        if(result.status === 'fail') {
            res.status(403).json(result.message)
        }
        else if (result.status === 'success'){
            res
            .cookie('refreshToken', result.data?.refreshToken)
            .json(result.status)
        }else{
            console.debug('exception thrown.', result)
            res.json(result.status)
        }
    }

    static refreshToken(req: Request, res: Response){
        const oldToken: string  = req.cookies['refreshToken'];
        const newToken = authService.refreshToken(oldToken)
        if(newToken){
            res.status(200).cookie('refreshToken', newToken).json('token valid')
        }else{
            res.status(401).json('invalid token')
        }
    }

}

export default AuthController