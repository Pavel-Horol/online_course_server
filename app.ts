import express, {Express, Request, Response, Application, NextFunction} from 'express';
import dotenv from 'dotenv';
import jwt, {JwtPayload} from 'jsonwebtoken'
import cookieParser  from 'cookie-parser'

interface jwtPayload extends JwtPayload{
   user: {
       id: number,
       username: string,
   }
}
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;
app.use(cookieParser())
const secretKey = process.env.JWT_SECRET_KEY || 'secret';

const authenticate = (req: Request, res: Response, next: NextFunction ) => {
    const accessToken = req.headers['authorization']
    const refreshToken = req.cookies['refreshToken'];
    if (!accessToken || !refreshToken) {
        return res.status(401).send('Access Denied. No token provided.')
    }

    try{
        const decoded = jwt.verify(accessToken, secretKey)
        //@ts-ignore
        req.user = decoded.user
        next()
    }catch (error){
        if(!refreshToken) {
            return res.status(401).send('Access Denied. No refresh token provided.')
        }
        try {
            const decoded = jwt.verify(refreshToken, secretKey)
            //@ts-ignore
            const accessToken = jwt.sign({user: decoded.user}, secretKey, {expiresIn: '1h'})

            res
                .cookie('refreshToken', refreshToken, {httpOnly: true, sameSite: 'strict'})
                .header('Authorization', accessToken)
                //@ts-ignore
                .send(decoded.user)
        }catch (error) {
            return res.status(400).send('Invalid Token.')
        }
    }
}

app.get('/protected', authenticate, (req: Request, res: Response) => {
    res.send('Welcome to the protected route')
})

app.post('/login', (req: Request, res: Response) => {
    const user ={
        id: 1,
        username: 'john.doe'
    }

    const accessToken = jwt.sign({user}, secretKey, {expiresIn: '1h'})
    const refreshToken = jwt.sign({user}, secretKey, {expiresIn: '1d'})
    res
        .cookie('refreshToken', refreshToken, {httpOnly: true, sameSite: 'strict'})
        .header('Authorization', accessToken)
        .send(user)
})

app.post('/refresh', (req: Request, res: Response) => {
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken) {
        return res.status(401).send('Access Denied. No refresh token provided.')
    }

    try{
        const decoded = jwt.verify(refreshToken, secretKey)
        //@ts-ignore
        const accessToken = jwt.sign({user: decoded.user}, secretKey, {expiresIn: '1d'})

        res
            .header('Authorization', accessToken)
            //@ts-ignore
            .send(decoded.user);
    }catch (error){
        return res.status(400).send('Invalid refresh token.')
    }

})
app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
