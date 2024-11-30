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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const order_service_1 = require("./order.service");
const config_1 = __importDefault(require("../../config"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const result = yield order_service_1.orderService.createOrder(payload);
        res.json({
            status: true,
            message: 'Order created successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: 'Something went wrong',
            error: error,
            stack: config_1.default.NODE_ENV == 'development' ? error.stack : undefined,
        });
    }
});
const calculateRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_service_1.orderService.calculateRevenue();
        res.json({
            status: true,
            message: 'Revenue calculated successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message == 'ZodError'
                ? 'ValidationError'
                : 'Something went wrong',
            error: error,
            stack: config_1.default.NODE_ENV == 'development' ? error.stack : undefined,
        });
    }
});
exports.orderController = {
    createOrder,
    calculateRevenue,
};
