"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_error_1 = require("@/exceptions/api-error");
const user_model_1 = __importDefault(require("@/models/user-model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserService {
    create(email, password, activationLink) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield user_model_1.default.findOne({ email }))
                throw api_error_1.ApiError.BadRequest('User already exists');
            const hashPassword = yield bcrypt_1.default.hash(password, 6);
            const user = yield user_model_1.default.create({
                email,
                password: hashPassword,
                activationLink
            });
            return user;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ email });
            if (!user)
                throw api_error_1.ApiError.BadRequest('User does not exist');
            return user;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findById(id);
            if (!user) {
                throw api_error_1.ApiError.BadRequest("User not found");
            }
            return user;
        });
    }
    activate(activationLink) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ activationLink });
            if (!user) {
                throw api_error_1.ApiError.BadRequest("Invalid activation link");
            }
            user.isActivated = true;
            yield user.save();
        });
    }
}
exports.default = new UserService();
