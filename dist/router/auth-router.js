"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("@/middlewares/auth-middleware"));
const auth_controller_1 = __importDefault(require("@/controller/auth-controller"));
const auth_validator_1 = __importDefault(require("@/validator/auth-validator"));
const validation_middleware_1 = require("@/middlewares/validation-middleware");
const authRouter = (0, express_1.Router)();
//public routes
authRouter.post("/registration", auth_validator_1.default.registration, validation_middleware_1.validateRequest, auth_controller_1.default.registration);
authRouter.post("/login", auth_validator_1.default.login, validation_middleware_1.validateRequest, auth_controller_1.default.login);
authRouter.post("/logout", auth_controller_1.default.logout);
authRouter.get("/activate/:link", auth_validator_1.default.activation, validation_middleware_1.validateRequest, auth_controller_1.default.activate);
authRouter.get("/refresh", auth_controller_1.default.refresh);
//protected routes
authRouter.get("/profile", auth_middleware_1.default, auth_controller_1.default.profile);
authRouter.get("/getActivationLink", auth_middleware_1.default, auth_controller_1.default.getActivationLink);
exports.default = authRouter;
