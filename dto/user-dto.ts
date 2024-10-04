import { ObjectId } from "mongoose";

class UserDto {
    email;
    id;
    isActivated;
    constructor (model: { email: string, _id: ObjectId, isActivated: boolean}) 
        {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated
    }
}

export default UserDto