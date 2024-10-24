import { ApiError } from "../exceptions/api-error"
import userModel from "../models/user-model"
import User from "../types/user-type";
import bcrypt from 'bcrypt';

class UserService {

    async create (email: string, password: string, activationLink: string): Promise<User> {
        if(await userModel.findOne({email})) throw ApiError.BadRequest('User already exists')
        
        const hashPassword = await bcrypt.hash(password, 6);
        const user = await userModel.create({
            email,
            password: hashPassword,
            activationLink
        })
        return user;
    }

    async findByEmail(email: string){
        const user = await userModel.findOne({email})
        if(!user) throw ApiError.BadRequest('User does not exist')
        return user
    }

    async findById(id: string) {
        const user = await userModel.findById(id);
        if (!user) {
            throw ApiError.BadRequest("User not found");
        }
        return user;
    }

    async activate(activationLink: string) {
        const user = await userModel.findOne({ activationLink });
        if (!user) {
            throw ApiError.BadRequest("Invalid activation link");
        }
        user.isActivated = true;
        await user.save();
    }

}

export default new UserService()