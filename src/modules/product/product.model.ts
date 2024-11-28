import mongoose, { Model, Schema } from 'mongoose'
import { IProduct } from './product.interface'

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true, min: 1 },
    type: {
      type: String,
      enum: ['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'],
      required: true,
    },
    description: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
)

const Product: Model<IProduct> = mongoose.model<IProduct>(
  'Product',
  ProductSchema
)

export default Product
