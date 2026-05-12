const authService = require('../services/authService');

const authControllerObj = {};

authControllerObj.login = async (req) => {
  const data = await authService.login(req.body);
  return {
    data,
  };
};

authControllerObj.registerSuperAdmin = async (req) => {
  const data = await authService.registerSuperAdmin(req.body);
  return { data, statusCode: 201 };
};

authControllerObj.registerCompany = async (req) => {
  const data = await authService.registerCompany(req);
  return { data, statusCode: 201 };
};

authControllerObj.registerCompanyProjectManager = async (req) => {
  const data = await authService.registerCompanyProjectManager(req);
  return { data, statusCode: 201 };
};

authControllerObj.registerCompanyProjectUser = async (req) => {
  const data = await authService.registerCompanyProjectUser(req);
  return { data, statusCode: 201 };
};

authControllerObj.getRefreshToken = async (req) => {
  const data = await authService.getRefreshToken(req);
  return { data };
};

module.exports = authControllerObj;
