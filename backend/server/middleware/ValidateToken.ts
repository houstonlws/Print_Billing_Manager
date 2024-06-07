import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../modules/auth/auth.model'


const validateToken = (req: Request, res: Response, next: NextFunction) =>{
    console.log('Validating token')
    const token: string  = req.cookies['refreshToken'];
    try {
        const user = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string) as User
        console.log('token valid')
        req.body['tokenData'] = user
        next()
    }catch(err){
        console.log('invalid token')
        res.status(400).json('Invalid token')
    }

}

export default validateToken

    

