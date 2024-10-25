import dotenv from 'dotenv';
dotenv.config();

import express, {Express, Request, Response, Application, NextFunction} from 'express';
import cookieParser  from 'cookie-parser'
import cors from 'cors'
import router from './router';
import database from './setup/db-setup';
import errorMiddleware from './middlewares/error-middleware';
import swaggerUI from 'swagger-ui-express'
import swaggerSpec from './setup/swagger-setup';
import helmet from 'helmet'
const port = process.env.PORT 
const app: Application = express();


app.use(cookieParser())
app.use(express.json())
app.use(cors({
    credentials: true,
    // origin: process.env.CLIENT_URL,
    origin: ['http://localhost:5173', 'https://online-course-client-inky.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"], 
      scriptSrc: ["'self'", "https://vercel.live"], 
      imgSrc: ["'self'", "https://online-course-server-rho.vercel.app"],
    },
}));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
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