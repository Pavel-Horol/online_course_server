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
const token_service_1 = __importDefault(require("./token-service"));
const user_dto_1 = __importDefault(require("@/dto/user-dto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const mail_service_1 = __importDefault(require("./mail-service"));
const user_service_1 = __importDefault(require("./user-service"));
const mongodb_1 = require("mongodb");
class AuthService {
    profile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.findById(id);
        });
    }
    activate(activationLink) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_service_1.default.activate(activationLink);
        });
    }
    refresh(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!refreshToken) {
                    throw api_error_1.ApiError.UnauthorizedError();
                }
                const tokenData = yield token_service_1.default.findRefresh(refreshToken);
                const tokenPayload = yield token_service_1.default.validateRefresh(refreshToken);
                if (!tokenPayload || !tokenData) {
                    throw api_error_1.ApiError.UnauthorizedError();
                }
                const user = yield user_service_1.default.findById(tokenData.user.toString());
                if (!user) {
                    throw api_error_1.ApiError.UnauthorizedError();
                }
                const userDto = new user_dto_1.default(user);
                const tokens = token_service_1.default.generate(userDto);
                yield token_service_1.default.save(user._id, tokens.refreshToken);
                return Object.assign({ user: userDto }, tokens);
            }
            catch (error) {
                throw error;
            }
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_service_1.default.findByEmail(email);
                const isPasswordCompare = yield bcrypt_1.default.compare(password, user.password);
                if (!isPasswordCompare) {
                    throw api_error_1.ApiError.BadRequest('Password does not match');
                }
                const userDto = new user_dto_1.default(user);
                const tokens = token_service_1.default.generate(userDto);
                yield token_service_1.default.save(user.id, tokens.refreshToken);
                return Object.assign({ user: userDto }, tokens);
            }
            catch (error) {
                throw error;
            }
        });
    }
    registration(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const activationLink = (0, uuid_1.v4)();
                const user = yield user_service_1.default.create(email, password, activationLink);
                yield mail_service_1.default.sendActivationMail(email, `${process.env.SERVER_URL}/api/auth/activate/${activationLink}`);
                const userDto = new user_dto_1.default(user);
                const tokens = token_service_1.default.generate(userDto);
                const userId = new mongodb_1.ObjectId(user._id.toString());
                yield token_service_1.default.save(userId, tokens.refreshToken);
                return Object.assign({ user: userDto }, tokens);
            }
            catch (error) {
                throw error;
            }
        });
    }
    activateLink(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findById(userId);
                yield mail_service_1.default.sendActivationMail(user.email, `${process.env.SERVER_URL}/api/auth/activate/${user.activationLink}`);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new AuthService();
