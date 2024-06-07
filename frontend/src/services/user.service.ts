import { getAxios } from "../config/axios.config";

const axios = getAxios()

class UserService {

    static getUserData = async function(){
        return await axios.post(`/getUserData`).then(res => {
            return res.data
        })
    }
}

export default UserService;