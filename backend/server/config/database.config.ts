import * as sql from 'mysql'
import 'dotenv/config'

const connection = sql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'print_billing_db'
})
connection.connect();

export default connection
