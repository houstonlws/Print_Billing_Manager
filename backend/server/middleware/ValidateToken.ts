import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/auth.model'


const validateToken = (req: Request, res: Response, next: NextFunction) =>{
    const token: string  = req.cookies['refreshToken'];
    try {
        const user = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string) as User
        console.log('refresh token valid')
        req.body['tokenData'] = user
        next()
    }catch(err){
        console.log('invalid refresh token')
        res.status(400).json('Invalid token')
    }

}

export default validateToken

    

