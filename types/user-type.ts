import { UserRole } from "../enum/role.enum";
import { ObjectId } from "mongoose";

export default interface  User{
    email: string;
    _id: ObjectId;
    password: string;
    roles: Array<UserRole>;
    profileImage: string;
    isActivated: boolean;
    activationLink: string;
}