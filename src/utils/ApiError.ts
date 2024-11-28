export default class ApiError extends Error {
  statusCode: number

  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
  }

  static notFound(message: string) {
    return new ApiError(404, message)
  }

  static validationError(message: string) {
    return new ApiError(400, message)
  }

  static insufficientStock(message: string) {
    return new ApiError(400, message)
  }

  static internalServerError(message: string) {
    return new ApiError(500, message)
  }
}
