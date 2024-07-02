import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.routes'
import printerRoutes from './routes/printer.routes'
import dataRoutes from './routes/data.routes'
import billingRoutes from './routes/billing.routes'
import maintenanceRoutes from './routes/maintenance.routes'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors({
    origin: ['http://localhost','http://localhost:3000'],
    credentials: true
}))
app.use(cookieParser())
app.use(authRoutes)
app.use(printerRoutes)
app.use(dataRoutes)
app.use(billingRoutes)
app.use(maintenanceRoutes)

app.listen(5000, () => {console.log("server started on port 5000")})