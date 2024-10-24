"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
    static UnauthorizedError() {
        return new ApiError(401, "User is not authorized");
    }
    static ForbiddenError() {
        return new ApiError(403, "Access denied");
    }
    static InternalServerError(message = "Internal server error") {
        return new ApiError(500, message);
    }
}
exports.ApiError = ApiError;
