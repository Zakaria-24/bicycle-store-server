/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { productService } from './product.service'
import productValidationSchema from './product.zod.validation'
import config from '../../config'

const createProduct = async (req: Request, res: Response) => {
  try {
    const payload = req.body
    const zodParsData = productValidationSchema.parse(payload)
    const result = await productService.createProduct(zodParsData)

    res.status(200).json({
      success: true,
      message: 'BiCycle created successfully',
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

const getProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query

    const result = await productService.getProducts(searchTerm as string)
    res.json({
      success: true,
      message: 'BiCycle retrieved successfully',
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

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const result = await productService.getSingleProduct(productId)
    res.json({
      success: true,
      message: 'BiCycle retrieved successfully',
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

const updateProduct = async (req: Request, res: Response) => {
  try {
    const payload = req.body
    const { productId } = req.params
    const result = await productService.updateProduct(productId, payload)
    res.json({
      success: true,
      message: 'BiCycle updated successfully',
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

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const result = await productService.deleteProduct(productId)
    res.json({
      success: true,
      message: 'BiCycle deleted successfully',
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

export const productController = {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
}
