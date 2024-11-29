/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { orderService } from './order.service'
import config from '../../config'

const createOrder = async (req: Request, res: Response) => {
  try {
    const payload = req.body
    const result = await orderService.createOrder(payload)

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
