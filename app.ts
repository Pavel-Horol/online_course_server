import dotenv from 'dotenv';
dotenv.config();

import express, {Express, Request, Response, Application, NextFunction} from 'express';
import cookieParser  from 'cookie-parser'
import cors from 'cors'
import router from './router';
import database from './setup/db-setup';
import errorMiddleware from './middlewares/error-middleware';

const secretKey = process.env.JWT_SECRET_KEY;
const port      = process.env.PORT || 8000;

const app: Application = express();


app.use(cookieParser())
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))

app.use('/api', router)
app.use(errorMiddleware)

const start = async () => {
    try{
        database()
        app.listen(port, () => {
            console.log(`Server is Fire at http://localhost:${port}`);
        });
    }catch(error){
        console.error(error)
    }
}


start()