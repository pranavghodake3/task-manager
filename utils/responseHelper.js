const successResponse = (res, data, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    status: true,
    statusCode,
    message,
    data,
  });
};

const errorResponse = (
  res,
  error = null,
  message = 'An error occurred. Please contact support.',
  code = 500,
) => {
  // Log full error for debugging
  if (error) {
    console.error('❌ Error:', {
      message: error.message || error,
      stack: error.stack,
    });
  }

  return res.status(code).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== 'production' &&
      error && {
        error: error.message || error,
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
