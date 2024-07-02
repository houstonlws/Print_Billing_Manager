import { getAxios } from "../utilities/axios.config"
import Cookies from 'js-cookie';
import { User } from "../types/auth.types";

const axios = getAxios()

class AuthService {

    static register =async function(email:string, password:string) {
        return await axios.post('/register', {
            email: email,
            password: password
        })
    }

    static login = async function(email:string, password:string){
        try {
            const result = await axios.post('/login', {
                email: email,
                password: password
            })
            if(result.status === 200) {
                document.cookie = Cookies.get('refreshToken') || ''
                return result.data
            }
            else return null
        } catch (error) {
            return null
        }
    }
    
    static refreshToken = async () => {
        try {
            const result = await axios.get('/refreshToken')
            if(result.status === 200) {
                return true
            }else return false
        } catch (error) {
            return false
        }
    }

    static getUserData = async function(){
        try {
            const result = await axios.post(`/getUserData`)
            if(result.status === 200) {
                return result
            }else return null
        } catch (error) {
            return null
        }
    }

    static updateUserData = async (data: User) => {
        try {
            console.log('[authService] sending data to update user', data)
            const result = await axios.put('/updateUserData', data)
            if(result.status === 200) return true
            else return false
        }catch(err){
            return false
        }
    }

    static getNotifications = async () => {
        try {
            const result = await axios.get('/notifications')
            if(result.status === 200) return result.data
            else return []
        }catch(err){
            return []
        }
    }

}

export default AuthService
