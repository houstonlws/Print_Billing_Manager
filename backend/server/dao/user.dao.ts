import connection from "../config/database.config";
import { User } from "../models/user.model";

class UserDao {

    static async addUser(user: User){
        return await new Promise<User>((resolve, reject) => {
            const query = `INSERT INTO users (id, username, email) VALUES (?, ?, ?)`;
            connection.query(query, [user.id, user.username, user.email], (err, res) => {
                if(err){
                    return reject(err)
                } else {
                    return resolve(res)
                }
            })
        })
    }

    static async getUserByUsername(name: string) {
        return await new Promise<User[]>((resolve, reject) => {
            const query = `SELECT * FROM users WHERE username=?`;
            connection.query(query, name, (err, res) => {
                if(err){
                    return reject(err)
                } else {
                    return resolve(res)
                }
            })
        })
    }

    static async getUserByEmail(email: string) {
        return await new Promise<User[]>((resolve, reject) => {
            const query = `SELECT * FROM users WHERE email='?'`;
            connection.query(query, email, (err, res) => {
                if(err){
                    return reject(err)
                } else {
                    return resolve(res)
                }
            })
        })
    }

}

export default UserDao