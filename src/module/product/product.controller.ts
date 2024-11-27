import { Request, Response } from 'express'
import { productService } from './product.service'

const createProduct = async (req: Request, res: Response) => {
  try {
    const payload = req.body

    const result = await productService.createProduct(payload)

    res.json({
      status: true,
      message: 'Bicycle created successfully',
      data: result,
    })
  } catch (error) {
    res.json({
      status: false,
      message: 'Failed to create bicycle',
      error,
    })
  }
}

const getProduct = async (req: Request, res: Response) => {
  try {
    const result = await productService.getProduct()

    res.json({
      status: true,
      message: 'All Bicycle get successfully',
      data: result,
    })
  } catch (error) {
    res.json({
      status: false,
      message: 'Failed to get all bicycle',
      error,
    })
  }
}

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await productService.getSingleProduct(id)
    res.json({
      status: true,
      message: 'Bicycle get successfully',
      data: result,
    })
  } catch (error) {
    res.json({
      status: false,
      message: 'Failed to get bicycle',
      error,
    })
  }
}

const updateProduct = async (req: Request, res: Response) => {
  try {
    const payload = req.body
    const id = req.params.id
    const result = await productService.updateProduct(id, payload)
    res.json({
      status: true,
      message: 'Bicycle updated successfully',
      data: result,
    })
  } catch (error) {
    res.json({
      status: false,
      message: 'Failed to update bicycle',
      error,
    })
  }
}

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await productService.deleteProduct(id)
    res.json({
      status: true,
      message: 'Bicycle deleted successfully',
      data: result,
    })
  } catch (error) {
    res.json({
      status: false,
      message: 'Failed to delete bicycle',
      error,
    })
  }
}

export const productController = {
  createProduct,
  getProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
}
