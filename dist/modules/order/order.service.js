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
exports.orderService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const product_model_1 = __importDefault(require("../product/product.model"));
const order_model_1 = __importDefault(require("./order.model"));
const createOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, product, quantity } = payload;
    // Fetch product details(main product that will be ordered)
    const bicycle = yield product_model_1.default.findById(product);
    if (!bicycle) {
        throw new Error('Product not found');
    }
    if (bicycle.quantity == 0) {
        throw new Error('order at lest one');
    }
    // Validate stock(order product er quantity jodi main j product{bicycle.quantity} ache tar quantity er cheye beshi hoy tahole Insufficient stock  )
    if (bicycle.quantity < quantity) {
        throw new Error('Insufficient stock');
    }
    // Calculate total price
    const totalPrice = bicycle.price * quantity;
    const order = yield order_model_1.default.create({ email, product, quantity, totalPrice });
    // Update product stock
    bicycle.quantity -= quantity; //bicycle.quantity = bicycle.quantity - quantity
    bicycle.inStock = bicycle.quantity > 0;
    yield bicycle.save();
    return order;
});
const calculateRevenue = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_model_1.default.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$totalPrice' },
                },
            },
        ]);
        const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0;
        return totalRevenue;
    }
    catch (error) {
        throw new Error('Failed to calculate revenue: ' + error.message);
    }
});
exports.orderService = {
    createOrder,
    calculateRevenue,
};
