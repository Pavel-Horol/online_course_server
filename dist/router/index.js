"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_router_1 = __importDefault(require("./auth-router"));
const posts_router_1 = __importDefault(require("./posts-router"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth-middleware"));
const image_router_1 = __importDefault(require("./image-router"));
const router = (0, express_1.Router)();
router.use('/auth', auth_router_1.default);
router.use('/posts', auth_middleware_1.default, posts_router_1.default);
router.use('/image', image_router_1.default);
exports.default = router;
