"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const image_controller_1 = __importDefault(require("../controller/image-controller"));
const multer_setup_1 = __importDefault(require("../setup/multer-setup"));
const imageRouter = (0, express_1.Router)();
imageRouter.post('/upload', multer_setup_1.default.single('image'), image_controller_1.default.upload);
exports.default = imageRouter;
