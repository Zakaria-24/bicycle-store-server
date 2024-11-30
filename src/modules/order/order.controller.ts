/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { orderService } from './order.service'
import config from '../../config'
import { productService } from '../product/product.service'

const createOrder = async (req: Request, res: Response) => {
  try {
    // const payload = req.body
    const payload = req.body
    const { email, product, quantity } = payload

    const bicycle = await productService.getSingleProduct(product)

    if (!bicycle) {
      return res.status(404).json({
        status: false,
        message: 'Bicycle not found',
      })
    }

    if (bicycle?.quantity < quantity) {
      return res.status(404).json({
        status: false,
        message: `Insufficient stock. Only ${bicycle.quantity} item(s) left.`,
      })
    }

    if (bicycle.quantity == 0) {
      return res.status(404).json({
        status: false,
        message: 'order at lest one',
      })
    }

    const totalPrice = bicycle.price * quantity

    // Update product stock
    bicycle.quantity -= quantity //bicycle.quantity = bicycle.quantity - quantity
    bicycle.inStock = bicycle.quantity > 0
    await bicycle.save()

    const result = await orderService.createOrder({
      email,
      product,
      quantity,
      totalPrice,
    })

    res.json({
      status: true,
      message: 'Order created successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'Something went wrong',
      error: error,
      stack: config.NODE_ENV == 'development' ? error.stack : undefined,
    })
  }
}

const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const result = await orderService.calculateRevenue()

    res.json({
      status: true,
      message: 'Revenue calculated successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message:
        error.message == 'ZodError'
          ? 'ValidationError'
          : 'Something went wrong',
      error: error,
      stack: config.NODE_ENV == 'development' ? error.stack : undefined,
    })
  }
}

export const orderController = {
  createOrder,
  calculateRevenue,
}
