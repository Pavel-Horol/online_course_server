import mongoose from 'mongoose'
import { model, Model, Schema, models } from "mongoose";

mongoose.Promise = global.Promise

const UserSchema = new Schema({
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


export default models.User || model('User', UserSchema);