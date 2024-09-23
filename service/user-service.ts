import UserModel from "../models/user-model"
import MailService from "./mail-service"
import uuid from 'uuid'
import bcrypt from 'bcrypt'
import mailService from "./mail-service"
import tokenService from "./token-service"
import UserDto from "../dtos/user-dto"

class UserService {

    async registration(email: string, password: string) {
        const candidate = await UserModel.findOne({email})
        if(candidate) { throw new Error('User already exist') }
    
        const hashPassword = await bcrypt.hash(password, 10)
        const activationLink = uuid.v4()

        const user = await UserModel.create({email, hashPassword, activationLink})
        await mailService.sendActivationMail(email, activationLink) 
        
        //@ts-ignore
        const userDto = new UserDto({...user})
        const tokens = tokenService.generateTokens(userDto)  
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
    
        return { ...tokens, user: userDto }
    }}

export default new UserService()