import { getAxios } from "../config/axios.config"
import Cookies from 'js-cookie';

const axios = getAxios()

class AuthService {

    static register = function(username:string, email:string, password:string){

        return axios.post('/register', {
            username: username,
            email: email,
            password: password
        })
    }

    static login = async function(username:string, password:string){
        return await axios.post('/login', {
            username: username,
            password: password
        })
        .then((response) => {
            if(response.status === 200){
                document.cookie = Cookies.get('refreshToken') || ''
                return response.data
            }
            else return null
        })
    
    }
    
    static refreshToken = async () => {
        return await axios.get('/refreshToken')
        .then(res => {
            return true
        }).catch(err =>{
            return false
        })
    }

}

export default AuthService
