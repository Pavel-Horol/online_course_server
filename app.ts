import dotenv from 'dotenv';
dotenv.config();

import express, {Express, Request, Response, Application, NextFunction} from 'express';
import cookieParser  from 'cookie-parser'
import mongoose from 'mongoose';
import cors from 'cors'
import router from './router';


const secretKey = process.env.JWT_SECRET_KEY;
const port      = process.env.PORT || 8000;

const app: Application = express();
app.use(cookieParser())
app.use(express.json())
app.use(cors())
app.use('/api', router)

const start = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING!, {})
        app.listen(port, () => {
            console.log(`Server is Fire at http://localhost:${port}`);
            console.table({
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT),
                secure: true,
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            })
        });
    }catch(error){
        console.error(error)
    }
}


start()