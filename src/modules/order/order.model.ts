import { model, Schema } from 'mongoose'
import { IOrder } from './order.interface'

const OrderSchema = new Schema<IOrder>(
  {
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (value: string) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
        },
        message: '{VALUE} is invalid Email. Please provide valid Email',
      },
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

const Order = model<IOrder>('Order', OrderSchema)

export default Order
