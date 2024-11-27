import { ErrorRequestHandler } from 'express'
import config from '../config'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'

  res.json({
    status: statusCode,
    success: false,
    message,
    stack: config.NODE_ENV === 'development' ? err.stack : undefined, // for development mode.
  })

  console.error(err)
}

export default globalErrorHandler
