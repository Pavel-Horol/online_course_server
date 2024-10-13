import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../types/auth-type";
import { ApiError } from "../exceptions/api-error";
import UserService from "../service/user-service";
import { cookieConfig } from "../setup/cookie-setup";

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
            const activationLink = req.params.link
            await UserService.activate(activationLink)
            return res.redirect(`${process.env.CLIENT_URL!}/profile`)
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

    async profile(req: Request, res: Response, next: NextFunction) {
        try {
            const userData = await UserService.profile(req.user.id)
            return res.status(200).json(userData)
        } catch (error) {
            next(error) 
        } 
    }

    async getActivationLink (req: Request, res: Response, next: NextFunction){
        try{
            const userId = req.user.id
            await UserService.activateLink(userId)
            res.sendStatus(200)
        } catch(error){
            next(error)
        }
    }
    async uploadPhoto (req: Request, res: Response, next: NextFunction){
        try {
            if(!req.file){ return res.status(400).json({message: 'No file uploaded'}) }
            

            res.status(200).json({fileUrl})
        } catch (error) {
            next(error)
        }
    }
}

export default new UserController()