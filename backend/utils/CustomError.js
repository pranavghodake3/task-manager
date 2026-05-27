class CustomError extends Error {
  constructor(message, statusCode = 500, data = null) {
    super(message);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.data = data;
    this.isOperational = true;

    // Proper stack trace (cleaner debugging)
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = CustomError;
