import mongoose, { Model, Schema } from 'mongoose'
import { IOrder } from './order.interface'

const OrderSchema = new Schema<IOrder>(
  {
    email: {
      type: String,
      required: true,
      match: /^\S+@\S+\.\S+$/, // Basic email validation
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
)

const Order: Model<IOrder> = mongoose.model<IOrder>('Order', OrderSchema)

export default Order
