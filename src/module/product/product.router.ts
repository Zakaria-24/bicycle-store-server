import { Router } from 'express'
import { productController } from './product.controller'

const productRouter = Router()

productRouter.post('/create-product', productController.createProduct)
productRouter.get('/', productController.getProduct)
productRouter.get('/:id', productController.getSingleProduct)
productRouter.put('/update-product/:id', productController.updateProduct)
productRouter.delete('/delete-product/:id', productController.deleteProduct)

export default productRouter
