import { Router } from 'express'
import { productController } from './product.controller'

const productRouter = Router()

productRouter.post('/create-product', productController.createProduct)
productRouter.get('/', productController.getProduct)
productRouter.get('/:productId', productController.getSingleProduct)
productRouter.put('/update-product/:productId', productController.updateProduct)
productRouter.delete(
  '/delete-product/:productId',
  productController.deleteProduct
)

export default productRouter
