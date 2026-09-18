const { REFRESH_TOKEN_EXPIRY } = require('../constants');
const authService = require('../services/authService');

const authControllerObj = {};

authControllerObj.login = async (req, res) => {
  const data = await authService.login(req.body);
  res.cookie('refreshToken', data.refreshToken, {
        maxAge: REFRESH_TOKEN_EXPIRY * 1000, // Expires after 1 hour (in milliseconds)
        httpOnly: true, // Prevent client-side JS access for security
        secure: true,   // Only sent over HTTPS or secure localhost
        sameSite: 'None' // Protects against CSRF attacks
    });
  return {
    data,
  };
};

authControllerObj.logout = async (_req, res) => {
  res.clearCookie('refreshToken');
  return {};
};

authControllerObj.registerSuperAdmin = async (req) => {
  const data = await authService.registerSuperAdmin(req.body);
  return { data, statusCode: 201 };
};

authControllerObj.registerUser = async (req) => {
  const data = await authService.registerUser(req.body);
  return { data, statusCode: 201 };
};

authControllerObj.registerCompany = async (req) => {
  const data = await authService.registerCompany(req.body);
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

authControllerObj.getRefreshAccessToken = async (req) => {
  const data = await authService.getRefreshAccessToken(req);
  return { data };
};

module.exports = authControllerObj;
