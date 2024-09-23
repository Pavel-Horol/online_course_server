import jwt from 'jsonwebtoken'
import tokenModel from '../models/token-model'

class TokenService{
    generateTokens(payload: any): {accessToken: string, refreshToken: string} {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {expiresIn: '10m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {expiresIn: '1d'})
        
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId: string, refreshToken: string) {
        const tokenData = await tokenModel.findOne({user: userId})
        if(tokenData){
            tokenData.refreshToken = refreshToken;
            return tokenData.refreshToken
        }
        const token = await tokenModel.create({user: userId, refreshToken})
        return token; 
    }
}

export default new TokenService()