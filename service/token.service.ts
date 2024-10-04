import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import tokenModel from '../models/token-model';


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
        const tokenData = await tokenModel.findOne({user: userId})
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
    
        const token = await tokenModel.create({user: userId, refreshToken})
        return token
    }

    static async remove(refreshToken: string) {
        const tokenData = await tokenModel.deleteOne({refreshToken})
        return tokenData
    }

}