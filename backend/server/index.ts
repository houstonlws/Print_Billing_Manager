import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost', 'http://localhost:3000'],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(routes);

app.listen(5000, () => {
  console.log('server started on port 5000');
});
