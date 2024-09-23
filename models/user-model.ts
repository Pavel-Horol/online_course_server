import mongoose from 'mongoose'
import { model, Model, Schema, models } from "mongoose";

mongoose.Promise = global.Promise

const UserSchema = new Schema({
    email: {type: String, unique: true, require: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String}
})


export default models.User || model('User', UserSchema);