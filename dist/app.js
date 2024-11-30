"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_router_1 = __importDefault(require("./modules/product/product.router"));
const order_router_1 = __importDefault(require("./modules/order/order.router"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// POST=> '/api/products/create-order'
app.use('/api/products', product_router_1.default);
app.use('/api/orders', order_router_1.default);
app.get('/', (req, res) => {
    res.send({
        status: true,
        message: 'Welcome to the Bi-Cycle SERVER!',
    });
});
exports.default = app;
