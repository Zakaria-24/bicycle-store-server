import Product from '../product/product.model'
import { IOrder } from './order.interface'
import Order from './order.model'

const createOrder = async (payload: IOrder): Promise<IOrder> => {
  const { email, product, quantity } = payload

  // Fetch product details(main product that will be ordered)
  const productDetails = await Product.findById(product)
  if (!productDetails) {
    throw new Error('Product not found')
  }

  // Validate stock(order product er quantity jodi main j product{productdetails.quantity} ache tar quantity er cheye beshi hoy tahole Insufficient stock  )
  if (productDetails.quantity < quantity) {
    throw new Error('Insufficient stock')
  }

  // Calculate total price
  const totalPrice = productDetails.price * quantity

  const order = await Order.create({ email, quantity, totalPrice, product })

  // Update product stock
  productDetails.quantity -= quantity //productDetails.quantity = productDetails.quantity - quantity
  productDetails.inStock = productDetails.quantity > 0
  await productDetails.save()

  return order
}

const calculateRevenue = async () => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: null, // We don't need to group by anything specific, we just want the total sum
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
