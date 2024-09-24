import MailService from "./mail-service"
import uuid from 'uuid'
import bcrypt from 'bcrypt'
import mailService from "./mail-service"
import tokenService from "./token-service"
import UserDto from "../dtos/user-dto"
import UserModel from "../models/user-model";

class UserService {

    async registration(email: string, password: string) {
        const candidate = await UserModel.findOne({email})
        if(candidate) { throw new Error('User already exist') }
    
        const hashPassword = await bcrypt.hash(password, 10)
        const activationLink = "bla bla bla"

        const user = await UserModel.create({email, password: hashPassword, activationLink})
        await mailService.sendActivationMail(email, activationLink)
        
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return { ...tokens, user: userDto }
    }}

export default new UserService()