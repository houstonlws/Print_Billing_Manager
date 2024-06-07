import { User } from "../models/user.model";
import connection from "../config/database.config";

export default class authDao{

    static async register(user: User){
        const query = 'INSERT INTO auth (username, email, password) VALUES (?, ?, ?)';
        return await new Promise<User>((res, rej)=> {
            connection.query(query, [user.username, user.email, user.password], (err, result) => {
                if(err){
                    return rej(err)
                } else {
                    return res(result)
                }
            })
        })

    }

    static async validateByUsername(user: User){
        const query = `SELECT id, username, email FROM auth WHERE username=? AND password=?`;
        return await new Promise<User[]>((resolve, reject) => {
            connection.query(query, [user.username, user.password], (err, res) => {
                if(err){
                    return reject(err)
                } else {
                    return resolve(res)
                }
            })
        })
    }

    static async validateByEmail(user: User){
        const query = `SELECT * FROM auth WHERE email=? AND password=?`;
        return await new Promise<User[]>((resolve, reject) => {
            connection.query(query, [user.email, user.password], (err, res) => {
                if(err){
                    return reject(err)
                } else {
                    return resolve(res)
                }
            })
        })
    }

}
