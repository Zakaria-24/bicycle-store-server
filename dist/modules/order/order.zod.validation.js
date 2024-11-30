"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const orderValidationSchema = zod_1.z.object({
    email: zod_1.z.string().refine((value) => emailRegex.test(value), (value) => ({
        message: `'${value}' is an invalid email. Please provide a valid email.`,
    })),
    product: zod_1.z
        .string()
        .regex(/^[a-fA-F0-9]{24}$/, 'Invalid product ID. Must be a valid MongoDB ObjectId.'),
    quantity: zod_1.z
        .number()
        .int('Quantity must be an integer.')
        .min(1, 'Quantity must be at least 1.'),
});
exports.default = orderValidationSchema;
