import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../types/auth-type";
import { ApiError } from "../exceptions/api-error";
import UserService from "../service/user-service";
import { cookieConfig } from "../setup/cookie-setup";
import UserDto from '../dto/user-dto';

class UserController {
    async registration(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body
            if(!email || !password) {
                throw ApiError.BadRequest("Missing required fields")
            }


            const {refreshToken, ...userData} = await UserService.registration(email, password)
            res.cookie('refreshToken', refreshToken, cookieConfig)
            return res.status(201).json(userData)
        } catch (error) {
            next(error) 
        } 
    }

    async login(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body
            if(!email || !password) {
                throw ApiError.BadRequest("Missing required fields")
            }
            const {refreshToken, ...userData} = await UserService.login(email, password)
            res.cookie('refreshToken', refreshToken, cookieConfig)
            return res.status(201).json(userData)
        } catch (error) {
            next(error) 
        } 
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
        
        } catch (error) {
            next(error) 
        } 
    }

    async activate(req: Request, res: Response, next: NextFunction) {
        try {
        
        } catch (error) {
            next(error) 
        } 
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const {refreshToken} = req.cookies
            const userData = await UserService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, cookieConfig)
            return res.json({user: userData.user, accessToken: userData.accessToken})
        } catch (error) {
            next(error) 
        } 
    }

    async users(req: Request, res: Response, next: NextFunction) {
        try {
        
        } catch (error) {
            next(error) 
        } 
    }

}

export default new UserController()