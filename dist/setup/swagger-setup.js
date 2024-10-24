"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Express API Documentation",
        version: "1.0.0",
        description: "This is the API documentation for your Express app",
    },
    servers: [
        {
            url: process.env.SERVER_URL,
            description: "Local server",
        },
    ],
};
const options = {
    swaggerDefinition,
    apis: ['./router/*.ts']
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
