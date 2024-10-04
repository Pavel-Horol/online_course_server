import { TokenExpiredError } from "jsonwebtoken";
import { ApiError } from "../exceptions/api-error";
import userModel from "../models/user-model";
import bcrypt from 'bcrypt';
import TokenService from "./token-service";
import UserDto from '../dto/user-dto';

export default class UserService {
    static async refresh(refreshToken: string) {
        try {
            if(!refreshToken) { throw ApiError.UnauthorizedError()}

            const tokenData = await TokenService.findRefresh(refreshToken)
            const tokenPayload = await TokenService.validateRefresh(refreshToken)
            if(!tokenPayload || !tokenData) { throw ApiError.UnauthorizedError() }
            
            const user = await userModel.findById(tokenData.user?._id)
            const userDto =  new UserDto(user)
            const tokens = TokenService.generate<UserDto>(userDto)
            await TokenService.save(user._id, tokens.refreshToken)
            return {
                user: userDto,
                ...tokens
            }
        } catch (error) {
            throw error
        }
    }
    static async login(email: string, password: string) {
        try {
            const user = await userModel.findOne({email})
            if(!user) { throw ApiError.BadRequest("User does not exist")}
            
            const isPasswordCompare = await bcrypt.compare(password, user.password)

            if(!isPasswordCompare) { throw ApiError.BadRequest('Password does not match') }
                        
            const userDto = new UserDto(user)
            const tokens = TokenService.generate<UserDto>(userDto)
            await TokenService.save(user.id, tokens.refreshToken)
            
            return {
                user: userDto,
                ...tokens
            }
        } catch (error) {
            throw error
        }
    }

    static async registration(email: string, password: string) {
        try{
            const isUserExist = await userModel.findOne({email})
            if(isUserExist) { throw ApiError.BadRequest("User already exist")}
            
            const hashPassword = await bcrypt.hash(password, 6)
            const user =         await userModel.create({email, password: hashPassword})

            const userDto = new UserDto(user)
            const tokens =  TokenService.generate<UserDto>(userDto)

            return {user: userDto, ...tokens}
        }catch(error) {
            throw error
        }

    }
    
}