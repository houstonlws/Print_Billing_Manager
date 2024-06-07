import UserDao from "../dao/user.dao";
import { User } from "../models/user.model";

class UserService {

    static async getUserData(user: User){
        const result = await UserDao.getUserByUsername(user.username)
        return result[0]
    }

}

export default UserService