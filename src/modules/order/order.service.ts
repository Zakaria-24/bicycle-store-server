/* eslint-disable @typescript-eslint/no-explicit-any */
// import Product from '../product/product.model'
import { IOrder } from './order.interface'
import Order from './order.model'

const createOrder = async (payload: IOrder): Promise<IOrder> => {
  const result = await Order.create(payload)
  return result
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
