"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const productRouter = (0, express_1.Router)();
productRouter.post('/create-product', product_controller_1.productController.createProduct);
productRouter.get('/', product_controller_1.productController.getProducts);
productRouter.get('/:productId', product_controller_1.productController.getSingleProduct);
productRouter.put('/:productId', product_controller_1.productController.updateProduct);
productRouter.delete('/:productId', product_controller_1.productController.deleteProduct);
exports.default = productRouter;
