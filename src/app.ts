import express, { Request, Response } from 'express'
import productRouter from './modules/product/product.router'
import orderRouter from './modules/order/order.router'
import globalErrorHandler from './utils/globalErrorHandler'

const app = express()
app.use(express.json())

// POST=> '/api/products/create-order'
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)
app.use(globalErrorHandler)

app.use((req, res) => {
  res.json({
    status: 404,
    success: false,
    message: 'Route not found',
  })
})

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Welcome to the Express.js API!',
  })
})

export default app
