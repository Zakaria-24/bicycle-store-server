import { IProduct } from './product.interface'
import Product from './product.model'

const createProduct = async (payload: IProduct): Promise<IProduct> => {
  const result = await Product.create(payload)
  return result
}

const getProduct = async () => {
  const result = await Product.find()
  return result
}

const getSingleProduct = async (productId: string) => {
  // const result = await Product.findOne({email: 'test@test.com'})
  const result = await Product.findById(productId)
  return result
}

const updateProduct = async (productId: string, payload: IProduct) => {
  const result = await Product.findByIdAndUpdate(productId, payload, {
    new: true,
  })
  return result
}

const deleteProduct = async (productId: string) => {
  const result = await Product.findByIdAndDelete(productId)
  return result
}

export const productService = {
  createProduct,
  getProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
}
