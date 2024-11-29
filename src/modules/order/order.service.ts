/* eslint-disable @typescript-eslint/no-explicit-any */
import Product from '../product/product.model'
import { IOrder } from './order.interface'
import Order from './order.model'

const createOrder = async (payload: IOrder): Promise<IOrder> => {
  const { email, product, quantity } = payload

  // Fetch product details(main product that will be ordered)
  const bicycle = await Product.findById(product)
  if (!bicycle) {
    throw new Error('Product not found')
  }

  if (bicycle.quantity == 0) {
    throw new Error('order at lest one')
  }

  // Validate stock(order product er quantity jodi main j product{bicycle.quantity} ache tar quantity er cheye beshi hoy tahole Insufficient stock  )
  if (bicycle.quantity < quantity) {
    throw new Error('Insufficient stock')
  }

  // Calculate total price
  const totalPrice = bicycle.price * quantity

  const order = await Order.create({ email, quantity, totalPrice, product })

  // Update product stock
  bicycle.quantity -= quantity //bicycle.quantity = bicycle.quantity - quantity
  bicycle.inStock = bicycle.quantity > 0
  await bicycle.save()

  return order
}

const calculateRevenue = async () => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalPrice' },
        },
      },
    ])

    const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0

    return totalRevenue
  } catch (error: any) {
    throw new Error('Failed to calculate revenue: ' + error.message)
  }
}

export const orderService = {
  createOrder,
  calculateRevenue,
}
