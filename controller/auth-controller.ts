import { NextFunction, Request, Response } from "express";
import authService from "../service/auth-service";
import { AuthRequest } from "../types/auth-type";
import { setCookie } from "../utilities/auth-utils";

class AuthController {
    async registration(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body
            const {refreshToken, ...userData} = await authService.registration(email, password)

            setCookie(res, 'refreshToken', refreshToken)
            return res.status(201).json(userData)
        } catch (error) {
            next(error) 
        } 
    }

    async login(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body
            const {refreshToken, ...userData} = await authService.login(email, password)

            setCookie(res, 'refreshToken', refreshToken)
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
            await authService.activate(activationLink)
            return res.redirect(`${process.env.CLIENT_URL!}/profile`)
        } catch (error) {
            next(error) 
        } 
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const {refreshToken} = req.cookies
            const userData = await authService.refresh(refreshToken)

            setCookie(res, 'refreshToken', refreshToken)
            return res.json({user: userData.user, accessToken: userData.accessToken})
        } catch (error) {
            next(error) 
        } 
    }

    async profile(req: Request, res: Response, next: NextFunction) {
        try {
            const userData = await authService.profile(req.user.id)
            return res.status(200).json(userData)
        } catch (error) {
            next(error) 
        } 
    }

    async getActivationLink (req: Request, res: Response, next: NextFunction){
        try{
            const userId = req.user.id
            await authService.activateLink(userId)
            res.sendStatus(200)
        } catch(error){
            next(error)
        }
    }

}

export default new AuthController()