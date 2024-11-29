import { ErrorRequestHandler } from 'express'
import config from '../config'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'

  res.status(statusCode).json({
    success: false,
    message,
    stack: config.NODE_ENV === 'development' ? err.stack : undefined,
  })

  console.error(err)
}

export default globalErrorHandler
