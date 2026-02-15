const { errorResponse, successResponse } = require('../utils/responseHelper');
const authService = require('../services/authService');

const authControllerObj = {};

authControllerObj.login = async (req, res) => {
  try {
    const data = await authService.login(req.body);
    return successResponse(res, data);
  } catch (error) {
    return errorResponse(res, error, error.message, error.statusCode);
  }
};

authControllerObj.register = async (req, res) => {
  try {
    const data = await authService.register(req.body);
    return successResponse(res, data);
  } catch (error) {
    return errorResponse(res, error, error.message, error.statusCode);
  }
};

module.exports = authControllerObj;
