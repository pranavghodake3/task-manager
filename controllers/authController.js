const { errorResponse, successResponse } = require('../utils/responseHelper');
const authService = require('../services/authService');

const authControllerObj = {};

authControllerObj.login = async (req, res) => {
  try {
    const data = await authService.login(req.body);
    return successResponse(res, data);
  } catch (error) {
    return errorResponse(res, error);
  }
};

authControllerObj.registerSuperAdmin = async (req, res) => {
  try {
    const data = await authService.registerSuperAdmin(req.body);
    return successResponse(res, data, 201);
  } catch (error) {
    return errorResponse(res, error);
  }
};

authControllerObj.registerCompany = async (req, res) => {
  try {
    const data = await authService.registerCompany(req);
    return successResponse(res, data, 201);
  } catch (error) {
    return errorResponse(res, error);
  }
};

authControllerObj.registerCompanyProjectManager = async (req, res) => {
  try {
    const data = await authService.registerCompanyProjectManager(req);
    return successResponse(res, data, 201);
  } catch (error) {
    return errorResponse(res, error);
  }
};

authControllerObj.registerCompanyProjectUser = async (req, res) => {
  try {
    const data = await authService.registerCompanyProjectUser(req);
    return successResponse(res, data, 201);
  } catch (error) {
    return errorResponse(res, error);
  }
};

authControllerObj.getRefreshToken = async (req, res) => {
  try {
    const data = await authService.getRefreshToken(req);
    return successResponse(res, data);
  } catch (error) {
    return errorResponse(res, error);
  }
};

module.exports = authControllerObj;
