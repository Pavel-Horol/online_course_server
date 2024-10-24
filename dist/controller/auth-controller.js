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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("@/service/auth-service"));
const auth_utils_1 = require("@/utilities/auth-utils");
class AuthController {
    registration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const _a = yield auth_service_1.default.registration(email, password), { refreshToken } = _a, userData = __rest(_a, ["refreshToken"]);
                (0, auth_utils_1.setCookie)(res, 'refreshToken', refreshToken);
                return res.status(201).json(userData);
            }
            catch (error) {
                next(error);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const _a = yield auth_service_1.default.login(email, password), { refreshToken } = _a, userData = __rest(_a, ["refreshToken"]);
                (0, auth_utils_1.setCookie)(res, 'refreshToken', refreshToken);
                return res.status(201).json(userData);
            }
            catch (error) {
                next(error);
            }
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                next(error);
            }
        });
    }
    activate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const activationLink = req.params.link;
                yield auth_service_1.default.activate(activationLink);
                return res.redirect(`${process.env.CLIENT_URL}/profile`);
            }
            catch (error) {
                next(error);
            }
        });
    }
    refresh(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                const userData = yield auth_service_1.default.refresh(refreshToken);
                (0, auth_utils_1.setCookie)(res, 'refreshToken', refreshToken);
                return res.json({ user: userData.user, accessToken: userData.accessToken });
            }
            catch (error) {
                next(error);
            }
        });
    }
    profile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = yield auth_service_1.default.profile(req.user.id);
                return res.status(200).json(userData);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getActivationLink(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                yield auth_service_1.default.activateLink(userId);
                res.sendStatus(200);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new AuthController();
