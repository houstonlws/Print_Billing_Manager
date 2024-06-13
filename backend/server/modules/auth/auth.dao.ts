import { User } from "./auth.model";
import connection from "../../config/database.config";
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

    static async updateUserData(user: User){
        return await new Promise<boolean>((resolve, reject) => {
            try {
                const {email, id} = user
                const firstName = user.firstName || null
                const lastName = user.lastName || null
                const department = user.department || null
                const phone = user.phone || null
                const query = `UPDATE users SET firstName=? , lastName=?, department_id=?, email=?, phone=? WHERE id=?`
                connection.query(query, [firstName, lastName, department, email, phone, id])
                resolve(true)
            } catch (error) {
                reject(false)
            }
        })
    }

}
