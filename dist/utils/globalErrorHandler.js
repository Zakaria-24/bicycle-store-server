"use strict";
// import { ErrorRequestHandler } from 'express'
// import config from '../config'
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        message,
        stack: config_1.default.NODE_ENV === 'development' ? err.stack : undefined,
    });
    console.error(err);
};
exports.default = globalErrorHandler;
