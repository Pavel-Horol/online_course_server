import { UserRole } from "../enum/role.enum";
import User from "../types/user-type";
import { ObjectId } from "mongoose";

class UserDto {
    email: string;
    id: ObjectId;
    isActivated: boolean;
    profileImage: string;
    roles: Array<UserRole>;
    constructor (model: User) 
        {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated
        this.profileImage = model.profileImage
        this.roles = model.roles
    }
}

export default UserDto