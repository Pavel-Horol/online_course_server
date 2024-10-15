import mongoose from 'mongoose'
import { model, Schema, models } from "mongoose";

mongoose.Promise = global.Promise
interface UserDocument extends Document {
    email: string;
    password: string;
    roles: ['user' | 'admin' | 'super_admin'];
    isActivated: boolean;
    activationLink: string
}

const UserSchema = new Schema<UserDocument>({
    email: {type: String, unique: true, require: true},
    password: {type: String, required: true},
    roles: {
        type: [String],
        enum: ['user', 'admin', 'super_admin'],
        default: ['user']
    },
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
})


export default models.User || model<UserDocument>('User', UserSchema);