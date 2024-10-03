import { v4 } from 'uuid'
import bcrypt from 'bcrypt'
import mailService from "./mail-service"
import tokenService from "./token-service"
import UserDto from "../dto/user-dto"
import UserModel from "../models/user-model";
import ApiError from "../exceptions/api-error";

class UserService {

    async registration(email: string, password: string) {
        const candidate = await UserModel.findOne({email})
        if(candidate) { ApiError.BadRequest('User already exist') }
    
        const hashPassword = await bcrypt.hash(password, 10)
        const activationLink = v4()
        const user = await UserModel.create({email, password: hashPassword, activationLink})
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)
        
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, user: userDto }
    }

    async activate(activationLink: string) {
        const user = await UserModel.findOne({activationLink})
        if(!user) { ApiError.BadRequest('activation error') }

        user.isActivated = true;
        await user.save()
    }
    async login(email: string, password: string) {
        const user = await UserModel.findOne({email})
        if(!user) { ApiError.BadRequest('User does not exist') }

        const isPassEquals = await bcrypt.compare(password, user.password)
        if(!isPassEquals){ throw ApiError.BadRequest('Password incorrect') }

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }


    async logout(refreshToken: string) {
        return await tokenService.removeToken(refreshToken);
    }

    async refresh(refreshToken: string) {
        if(!refreshToken) { throw ApiError.UnauthorizedError(); }

        const userData    = await tokenService.validateRefreshToken(refreshToken)
        const tokenFromDB = await tokenService.findToken(refreshToken)
        
        if(!userData || !tokenFromDB) { 
            throw new Error("Some error in user refresh")
        }
        //@ts-ignore
        const user = await UserModel.findById(userData.id!)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async getAllUsers() {
        return UserModel.find();
    }
}

export default new UserService()