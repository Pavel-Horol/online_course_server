import { UserRole } from '@/enum/role.enum';
import User from '@/types/user-type';
import mongoose from 'mongoose'
import { model, Schema, models } from "mongoose";

mongoose.Promise = global.Promise
interface UserDocument extends User, Document {}

const UserSchema = new Schema<UserDocument>({
    email: {type: String, unique: true, require: true},
    password: {type: String, required: true},
    roles: {
        type: [String],
        enum: Object.values(UserRole),
        default: [UserRole.USER]
    },
    profileImage: {
        type: String, 
        default: 'https://firebasestorage.googleapis.com/v0/b/lms-storage-e028b.appspot.com/o/files%2Fgruvbox15.png?alt=media&token=6985f4ad-e744-4d83-8be8-34d818de5fee'
    },
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
})


export default models.User || model<UserDocument>('User', UserSchema);