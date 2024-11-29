import express, { Request, Response } from 'express'
import productRouter from './modules/product/product.router'
import orderRouter from './modules/order/order.router'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

// POST=> '/api/products/create-order'
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Welcome to the Bi-Cycle SERVER!',
  })
})

export default app
