import { Request, Response } from 'express'
import { orderService } from './order.service'
import ApiError from '../../utils/ApiError'

const createOrder = async (req: Request, res: Response) => {
  try {
    const payload = req.body

    const result = await orderService.createOrder(payload)

    res.json({
      status: true,
      message: 'Order created successfully',
      data: result,
    })
  } catch (error) {
    // Handle validation and other errors
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({
        status: false,
        message: error.message,
      })
    } else {
      res.status(500).json({
        status: false,
        message: 'Internal Server Error',
      })
    }
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
  } catch (error) {
    res.json({
      status: false,
      message: 'Failed to calculate revenue',
      error,
    })
  }
}

export const orderController = {
  createOrder,

  calculateRevenue,
}
