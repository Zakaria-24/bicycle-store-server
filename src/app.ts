import express, { Request, Response } from 'express'
import productRouter from './module/product/product.router'

const app = express()
app.use(express.json())

// POST=> '/api/product/create-product'
app.use('/api/product', productRouter)

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Welcome to the Express.js API!',
  })
})

export default app
