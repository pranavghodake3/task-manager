const statusCodeMessages = {
  HTTP_CODE_MESSAGES: {
    // ✅ 2xx Success
    200: 'Request completed successfully.',
    201: 'Resource created successfully.',
    202: 'Request accepted for processing.',
    204: 'Request successful. No content returned.',

    // ⚠️ 4xx Client Errors
    400: 'Invalid request data.',
    401: 'Authentication required.',
    403: 'You do not have permission to perform this action.',
    404: 'Requested resource not found.',
    405: 'HTTP method not allowed for this endpoint.',
    409: 'Conflict occurred. Resource may already exist.',
    422: 'Validation failed. Please check your input.',
    429: 'Too many requests. Please try again later.',

    // 🔥 5xx Server Errors
    500: 'Something went wrong on our server.',
    502: 'Bad gateway. Upstream server error.',
    503: 'Service temporarily unavailable.',
    504: 'Gateway timeout. Please try again later.',
  },
};

module.exports = statusCodeMessages;
