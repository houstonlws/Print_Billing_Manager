import { User } from "../models/auth.model";
import connection from "../config/database.config";
import { queryCallback } from "mysql";

export default class authDao{

    static async register(user: User){
        const query = 'INSERT INTO auth (email, password) VALUES (?, ?)';
        return await new Promise<any>((res, rej)=> {
            connection.query(query, [user.email, user.password], (err, result) => {
                if(err){
                    rej(err)
                } else {
                    res(result)
                }
            })
        })

    }

    static async login(user: User){
        const query = `SELECT * FROM auth WHERE email=? AND password=?`;
        return await new Promise<User[]>((resolve, reject) => {
            connection.query(query, [user.email, user.password], (err, res) => {
                if(err){
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
    }

    static async getTokenData(email: string){
        const query = `SELECT id, email FROM auth WHERE email=?`;
        return await new Promise<User[]>((resolve, reject) => {
            connection.query(query, email, (err, res) => {
                if(err){
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
    }

    static async addUserData(user: User){
        return await new Promise<User>((resolve, reject) => {
            const query = `INSERT INTO users (id, email) VALUES (?, ?)`;
            connection.query(query, [user.id, user.email], (err, res) => {
                if(err){
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
    }

    static async getUserData(id: string) {
        return await new Promise<User[]>((resolve, reject) => {
            const query = `SELECT * FROM users WHERE id=?`;
            connection.query(query, id, (err, res) => {
                if(err){
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
    }

    static async updateUserData(id:string, user: User){
        return await new Promise<boolean>((resolve, reject) => {
            try {
                console.log('[authDAO] updating user data', user)
                const email = user.email
                const firstName = user.firstName || null
                const lastName = user.lastName || null
                const department_id = user.department_id || null
                const phone = user.phone || null
                const query = department_id ? 
                `UPDATE users SET firstName=?, lastName=?, department_id=?, email=?, phone=? WHERE id=?`:
                `UPDATE users SET firstName=?, lastName=?, email=?, phone=? WHERE id=?`
                const data = department_id ? 
                [firstName, lastName, department_id, email, phone, id]:
                [firstName, lastName, email, phone, id]
                console.log(query, data)
                connection.query(query, data)
                resolve(true)
            } catch (error) {
                reject(false)
            }
        })
    }

    static async getNotifications(id: string) {
        return await new Promise<User[]>((resolve, reject) => {
            const query = `SELECT * FROM notifications WHERE user_id=?`;
            connection.query(query, id, (err, res) => {
                if(err){
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
    }

}
