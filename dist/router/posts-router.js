"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const posts_controller_1 = __importDefault(require("../controller/posts-controller"));
const postsRouter = (0, express_1.Router)();
postsRouter.post('/create', posts_controller_1.default.create);
postsRouter.delete('/delete/:id', posts_controller_1.default.delete);
postsRouter.get('/all', posts_controller_1.default.getAll);
postsRouter.get('/one', posts_controller_1.default.getOne);
postsRouter.get('/byUser/:id', posts_controller_1.default.getUsers);
postsRouter.patch('/edit/:id', posts_controller_1.default.edit);
exports.default = postsRouter;
