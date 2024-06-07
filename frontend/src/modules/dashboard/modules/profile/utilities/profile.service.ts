import { getAxios } from "../../../../../utilities/axios.config"
import { Department, User } from "./profile.models"

const axios = getAxios()

class ProfileService {
    
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
            const result = await axios.put('/updateUserData', data)
            if(result.status === 200) return true
            else return false
        }catch(err){
            return false
        }
    }

    static getDepartments = async () => {
        try {
            const result = await axios.get('/data/departments')
            return result.data
        } catch (error) {
            return []
        } 
            
    }
}

export default ProfileService