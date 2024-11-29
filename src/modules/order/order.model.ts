import { model, Schema } from 'mongoose'
import { IOrder } from './order.interface'

const OrderSchema = new Schema<IOrder>(
  {
    email: {
      type: String,
      required: true,
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
    },
  },
  { timestamps: true }
)

const Order = model<IOrder>('Order', OrderSchema)

export default Order
