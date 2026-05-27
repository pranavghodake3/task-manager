const { successResponse, errorResponse } = require('./responseHelper');

const handleAsyncFunction = (asyncFunction) => {
  return async function (req, res, next) {
    try {
      const { data, statusCode } = await asyncFunction(req, res, next);
      return successResponse(res, data, statusCode);
    } catch (error) {
      return errorResponse(res, error);
    }
  };
};

module.exports = {
  handleAsyncFunction,
};
