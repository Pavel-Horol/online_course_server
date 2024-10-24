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
exports.default = authMiddleware;
const api_error_1 = require("../exceptions/api-error");
const token_service_1 = __importDefault(require("../service/token-service"));
function authMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authHeaders = req.headers.authorization;
            if (!authHeaders) {
                return next(api_error_1.ApiError.UnauthorizedError());
            }
            const accessToken = authHeaders.split(' ')[1];
            if (!accessToken) {
                return next(api_error_1.ApiError.UnauthorizedError());
            }
            const userData = yield token_service_1.default.validateAccess(accessToken);
            if (!userData) {
                return next(api_error_1.ApiError.UnauthorizedError());
            }
            req.user = userData.payload;
            next();
        }
        catch (error) {
            return next(api_error_1.ApiError.UnauthorizedError());
        }
    });
}
