"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
    static notFound(message) {
        return new ApiError(404, message);
    }
    static validationError(message) {
        return new ApiError(400, message);
    }
    static insufficientStock(message) {
        return new ApiError(400, message);
    }
    static internalServerError(message) {
        return new ApiError(500, message);
    }
}
exports.default = ApiError;
