import { ObjectId } from "mongoose";

class UserDto {
    email: string;
    id: ObjectId;
    isActivated: boolean;
    profileImage: string;
    constructor (model: { email: string, _id: ObjectId, isActivated: boolean, profileImage: string}) 
        {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated
        this.profileImage = model.profileImage
    }
}

export default UserDto