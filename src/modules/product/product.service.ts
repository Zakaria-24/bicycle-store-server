import ApiError from '../../utils/ApiError'
import { IProduct } from './product.interface'
import Product from './product.model'

const createProduct = async (payload: IProduct): Promise<IProduct> => {
  if (payload.price < 0) {
    throw ApiError.validationError('Price must be positive')
  }
  if (payload.quantity < 0) {
    throw ApiError.validationError('quantity must be positive')
  }

  const result = await Product.create(payload)
  return result
}

const getProducts = async (searchTerm?: string) => {
  const filter = searchTerm
    ? {
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { brand: { $regex: searchTerm, $options: 'i' } },
          { type: { $regex: searchTerm, $options: 'i' } },
        ],
      }
    : {}

  const products = await Product.find(filter)
  return products
}

const getSingleProduct = async (productId: string) => {
  // const result = await Product.findOne({email: 'test@test.com'})
  const result = await Product.findById(productId)
  return result
}

const updateProduct = async (productId: string, payload: IProduct) => {
  const result = await Product.findByIdAndUpdate(productId, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteProduct = async (productId: string) => {
  const result = await Product.findByIdAndDelete(productId)
  return result
}

export const productService = {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
}
