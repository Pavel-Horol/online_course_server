"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const role_enum_1 = require("@/enum/role.enum");
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
mongoose_1.default.Promise = global.Promise;
const UserSchema = new mongoose_2.Schema({
    email: { type: String, unique: true, require: true },
    password: { type: String, required: true },
    roles: {
        type: [String],
        enum: Object.values(role_enum_1.UserRole),
        default: [role_enum_1.UserRole.USER]
    },
    profileImage: {
        type: String,
        default: 'https://firebasestorage.googleapis.com/v0/b/lms-storage-e028b.appspot.com/o/files%2Fgruvbox15.png?alt=media&token=6985f4ad-e744-4d83-8be8-34d818de5fee'
    },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String },
});
exports.default = mongoose_2.models.User || (0, mongoose_2.model)('User', UserSchema);
