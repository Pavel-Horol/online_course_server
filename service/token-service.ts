import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import tokenModel from '../models/token-model';
import { ApiError } from '../exceptions/api-error';


export default class TokenService {
    static generate <T>(payload: T) {
        const accessToken = jwt.sign(
            {payload},
            process.env.JWT_ACCESS_SECRET!,
            {expiresIn: process.env.JWT_ACCESS_EXPIRES!}
        )
        const refreshToken = jwt.sign(
            {payload},
            process.env.JWT_REFRESH_SECRET!,
            {expiresIn: process.env.JWT_REFRESH_EXPIRES!}
        )
        return {
            accessToken,
            refreshToken
        }
    }

    static async save(userId: ObjectId, refreshToken: string) {
        try {
            const tokenData = await tokenModel.findOne({user: userId})
            if (tokenData) {
                tokenData.refreshToken = refreshToken
                return tokenData.save()
            }
        
            const token = await tokenModel.create({user: userId, refreshToken})
            return token
            
        } catch (error) {
            throw error
        }
    }

    static async remove(refreshToken: string) {
        try {
            const tokenData = await tokenModel.deleteOne({refreshToken})
            return tokenData
        } catch (error) {
            throw error
        }
    }

    static async validateRefresh(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
            return userData;
        } catch (e) {
            return null;
        }
    }

    static async validateAccess(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
            return userData;
        } catch (e) {
            return null;
        }
    }

    static async findRefresh(token: string) {
        const tokenData = tokenModel.findOne({refreshToken: token})
        return tokenData
    }
}