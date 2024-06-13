import { getAxios } from "../../../utilities/axios.config"
import Cookies from 'js-cookie';
import { User } from "./auth.models";

const axios = getAxios()

class AuthService {

    static register =async function(email:string, password:string){
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

}

export default AuthService
