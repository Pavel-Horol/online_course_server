import { NextFunction, Request, Response } from "express";
import userService from "../service/user-service";

class UserController {
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body 
            const userData = await userService.registration(email, password)
            
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.json(userData)
        } catch (error) {
            console.log(error)            
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            
        } catch (error) {
            
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            
        } catch (error) {
            
        }
    }

    async activate(req: Request, res: Response, next: NextFunction) {
        try {
            
        } catch (error) {
            
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            
        } catch (error) {
            
        }
    }

    async users(req: Request, res: Response, next: NextFunction) {
        try {
            res.json(['1234', '1234'])
        } catch (error) {
            
        }
    }

}

export default new UserController()