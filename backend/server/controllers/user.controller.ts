import { Request, Response } from "express";
import UserService from "../services/user.service";

class UserController {

    static async getUserData(req: Request, res: Response){
        const user = req.body;
        const result = await UserService.getUserData(user)
        res.status(200).json({
            data: result
        })
    }

}

export default UserController