import { Request, Response } from 'express'
import { productService } from './product.service'
import ApiError from '../../utils/ApiError'

const createProduct = async (req: Request, res: Response) => {
  try {
    const payload = req.body
    const requiredFields = [
      'name',
      'brand',
      'price',
      'type',
      'description',
      'quantity',
      'inStock',
    ]

    for (const field of requiredFields) {
      if (payload[field] === undefined || payload[field] === null) {
        throw ApiError.validationError(`The '${field}' field is required.`)
      }
    }
    const result = await productService.createProduct(payload)

    res.status(201).json({
      success: true,
      message: 'BiCycle created successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    })
  }
}

const getProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query

    const result = await productService.getProducts(searchTerm as string)

    if (!result) {
      throw ApiError.notFound('BiCycles not found')
    }

    res.json({
      success: true,
      message: 'BiCycle retrieved successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    })
  }
}

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const result = await productService.getSingleProduct(productId)
    if (!result) {
      throw ApiError.notFound('BiCycle not found')
    }

    res.json({
      success: true,
      message: 'BiCycle retrieved successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    })
  }
}

const updateProduct = async (req: Request, res: Response) => {
  try {
    const payload = req.body
    const { productId } = req.params
    const result = await productService.updateProduct(productId, payload)
    if (!result) {
      throw ApiError.notFound('BiCycle not found')
    }

    res.json({
      success: true,
      message: 'BiCycle updated successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    })
  }
}

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const result = await productService.deleteProduct(productId)
    if (!result) {
      throw ApiError.notFound('BiCycle not found')
    }

    res.json({
      success: true,
      message: 'BiCycle deleted successfully',
    })
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Internal Server Error',
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
