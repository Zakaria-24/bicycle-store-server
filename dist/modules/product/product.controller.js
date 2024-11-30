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
exports.productController = void 0;
const product_service_1 = require("./product.service");
const product_zod_validation_1 = __importDefault(require("./product.zod.validation"));
const config_1 = __importDefault(require("../../config"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const zodParsData = product_zod_validation_1.default.parse(payload);
        const result = yield product_service_1.productService.createProduct(zodParsData);
        res.status(200).json({
            success: true,
            message: 'BiCycle created successfully',
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
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        const result = yield product_service_1.productService.getProducts(searchTerm);
        res.json({
            success: true,
            message: 'BiCycle retrieved successfully',
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
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.productService.getSingleProduct(productId);
        res.json({
            success: true,
            message: 'BiCycle retrieved successfully',
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
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const { productId } = req.params;
        const result = yield product_service_1.productService.updateProduct(productId, payload);
        res.json({
            success: true,
            message: 'BiCycle updated successfully',
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
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.productService.deleteProduct(productId);
        res.json({
            success: true,
            message: 'BiCycle deleted successfully',
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
exports.productController = {
    createProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
