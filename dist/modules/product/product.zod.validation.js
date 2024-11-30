"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const productValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .nonempty({ message: 'Name is required and cannot be empty' }),
    brand: zod_1.z
        .string()
        .nonempty({ message: 'Brand is required and cannot be empty' }),
    price: zod_1.z
        .number()
        .int({ message: 'Price must be an integer' })
        .positive({ message: 'Price must be a positive number' }),
    type: zod_1.z.enum(['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'], {
        message: "Category must be one of: 'Mountain', 'Road', 'Hybrid', 'BMX', or 'Electric'",
    }),
    description: zod_1.z
        .string()
        .nonempty({ message: 'Description is required and cannot be empty' }),
    quantity: zod_1.z
        .number()
        .int({ message: 'Quantity must be an integer' })
        .min(1, { message: 'Quantity must be at least 1' }),
    inStock: zod_1.z.boolean().refine((val) => typeof val === 'boolean', {
        message: 'InStock must be a boolean value',
    }),
});
exports.default = productValidationSchema;
