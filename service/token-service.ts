import jwt from 'jsonwebtoken'
import tokenModel from '../models/token-model'

class TokenService{
    generateTokens(payload: any): {accessToken: string, refreshToken: string} {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {expiresIn: '10m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {expiresIn: '1h'})
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId: string, refreshToken: string) {
        const tokenData = await tokenModel.findOne({user: userId})
        if(tokenData){
            tokenData.refreshToken = refreshToken;
            return tokenData.save()
        }
        return await tokenModel.create({user: userId, refreshToken});
    }
    async removeToken(refreshToken: string){
        return tokenModel.deleteOne({refreshToken});
    }

    async validateAccessToken(token: string) {
        try{
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET!)
        } catch (e) {
            return null
        }
    }

    async validateRefreshToken(token: string) {
        try{
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET!)
        } catch (e) {
            return null
        }
    }

    async findToken(refreshToken: string) {
        const tokenData = await tokenModel.findOne({ refreshToken})
        const tokensData = await tokenModel.find()
        return tokenData
    }
}

export default new TokenService()