import * as jwt from 'jsonwebtoken'
import { User } from "../models/user.model"
import { ServiceReturnType } from "../models/dto/service.model"
import authDao from '../dao/auth.dao'
import UserDao from '../dao/user.dao'

class AuthService {

    static async register(user: User){
        console.debug("Registering user: " + user.username)
        try{
            await authDao.register(user)
            const data = await authDao.validateByUsername(user)
            await UserDao.addUser(data[0]);
            return {
                status: 'success',
                message: 'User registered successfully'
            }
        }
        catch(err){
            console.log('caught registration fail', err)
            return {
                status: 'fail',
                message: 'Username taken'
            }
        }
    }

    static async login(user: User){
        console.debug('Validating user: ' + user.username)
        try{
            const validationResult = await authDao.validateByUsername(user)
            if(validationResult?.length > 0){
                console.debug('User: '+ user.username + ' validated')
                const authData = await UserDao.getUserByUsername(user.username)
                const refreshToken = jwt.sign({...authData[0]}, process.env.REFRESH_TOKEN_SECRET as string, {expiresIn: '15m'})
                return {
                    status: 'success',
                    data: {
                        refreshToken: refreshToken
                    },
                    message: ''
                }
            }else {
                return {
                    status: 'fail',
                    message: 'Incorrect username or password'
                }
            }
        }
        catch(err){
            console.error('ERROR THROWN!!!',err)
            return {
                status: 'error',
                message: 'Something went wrong'
            }
        }
    }

    static refreshToken(oldToken: string){
        try {
            const user = jwt.verify(oldToken, process.env.REFRESH_TOKEN_SECRET as string)
            const {id, username, email, iat, exp } = user as jwt.JwtPayload
            if(iat && exp && iat  < exp){
                return jwt.sign({id: id, username: username, email: email}, 
                    process.env.REFRESH_TOKEN_SECRET as string, {expiresIn: '15m'})
            }else{
                return null
            }
        }catch(err){
            return null
        }
    }

}

export default AuthService

