import { NextFunction, Request, Response } from "express";
import { ApiError } from "../exceptions/api-error";
import TokenService from "../service/token-service";
import tokenModel from "../models/token-model";

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeaders = req.headers.authorization
        if(!authHeaders){
            return next(ApiError.UnauthorizedError())
        }
        
        const accessToken = authHeaders.split(' ')[1]
        if(!accessToken) {
            return next(ApiError.UnauthorizedError())
        }
    
        const userData = await TokenService.validateAccess(accessToken) 
        if(!userData) {
            return next(ApiError.UnauthorizedError())
        }
        //@ts-ignore
        console.log(userData.payload)
        req.body = userData
        next();
    } catch(error) {
        return next(ApiError.UnauthorizedError())
    }
}