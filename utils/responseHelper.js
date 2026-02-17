const { HTTP_CODE_MESSAGES } = require('../constants/statusCodeMessages');
const logger = require('../config/logger');

const successResponse = (res, data, statusCode = 200) => {
  return res.status(statusCode).json({
    status: true,
    statusCode,
    message: HTTP_CODE_MESSAGES[statusCode] || 'Success',
    data,
  });
};

const errorResponse = (res, error = null, code = 500) => {
  const finalStatusCode = error?.statusCode || error?.code || code || 500;

  if (error) {
    logger.error({
      message: error.message || error,
      stack: error.stack,
    });
    console.error('Error:', error);
  }
  let errorPayload = {
    ...(error?.data ? { data: error.data } : null),
    message: error?.message || HTTP_CODE_MESSAGES[finalStatusCode] || 'Error',
  };

  return res.status(finalStatusCode).json({
    success: false,
    message: HTTP_CODE_MESSAGES[finalStatusCode] || 'Error',
    statusCode: finalStatusCode,
    ...(process.env.NODE_ENV !== 'production' &&
      errorPayload && {
        error: errorPayload,
      }),
  });
};

const validationError = (res, errors, code = 400) => {
  return res.status(code).json({
    status: false,
    message: 'Validation errors',
    errors,
  });
};

module.exports = {
  successResponse,
  errorResponse,
  validationError,
};
