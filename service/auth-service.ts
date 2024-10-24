import { ApiError } from "../exceptions/api-error"
import userModel from "../models/user-model"
import tokenService from "./token-service"
import UserDto from "../dto/user-dto"
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import mailService from './mail-service';
import userService from "./user-service";
import { ObjectId as MongoObjectId } from "mongodb";
class AuthService {

    async profile(id: string) {
        return await userModel.findById(id)
    }

    async activate(activationLink: string) {
        await userService.activate(activationLink)
    }

    async refresh(refreshToken: string) {
        try {
            if(!refreshToken) { throw ApiError.UnauthorizedError()}

            const tokenData = await tokenService.findRefresh(refreshToken)
            const tokenPayload = await tokenService.validateRefresh(refreshToken)
            if(!tokenPayload || !tokenData) { throw ApiError.UnauthorizedError() }
            const user = await userService.findById(tokenData.user.toString())
            if(!user){ throw ApiError.UnauthorizedError()}

            const userDto =  new UserDto(user)
            const tokens = tokenService.generate<UserDto>(userDto)
            await tokenService.save(user._id, tokens.refreshToken)

            return {
                user: userDto,
                ...tokens
            }
        } catch (error) {
            throw error
        }
    }

    async login(email: string, password: string) {
        try {
            const user = await userService.findByEmail(email)
            
            const isPasswordCompare = await bcrypt.compare(password, user.password)
            if(!isPasswordCompare) { throw ApiError.BadRequest('Password does not match') }
                        
            const userDto = new UserDto(user)
            const tokens = tokenService.generate<UserDto>(userDto)
            await tokenService.save(user.id, tokens.refreshToken)
            
            return {
                user: userDto,
                ...tokens
            }
        } catch (error) {
            throw error
        }
    }

    async registration(email: string, password: string) {
        try{
            const activationLink = v4()          
            
            const user = await userService.create(email, password, activationLink)
            await mailService.sendActivationMail(email, `${process.env.SERVER_URL}/api/auth/activate/${activationLink}`)
            
            const userDto = new UserDto(user);
            const tokens = tokenService.generate(userDto)
            const userId = new MongoObjectId(user._id.toString());

            await tokenService.save(userId, tokens.refreshToken)

            return {
                user: userDto,
                ...tokens
            }
        }catch(error) {
            throw error
        }

    }
    
    async activateLink(userId: string){
        try {
            const user = await userModel.findById(userId)
            await mailService.sendActivationMail(user.email, `${process.env.SERVER_URL}/api/auth/activate/${user.activationLink}`)
        } catch (error) {
            throw error 
        }
    }
}

export default new AuthService()