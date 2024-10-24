"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorMiddleware;
const api_error_1 = require("../exceptions/api-error");
function errorMiddleware(err, req, res, next) {
    console.log(err);
    if (err instanceof api_error_1.ApiError) {
        return res.status(err.status).json({ message: err.message, errors: err.errors });
    }
    return res.status(500).json({ message: "Unexpected error occurred" });
}
