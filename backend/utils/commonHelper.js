const { ROLES, GLOBAL_ROLES } = require('../constants');
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

const getUserRoles = () => {
  const roles = { ...GLOBAL_ROLES, ...ROLES };
  delete roles.COMPANY_ADMIN;
  delete roles.SUPER_ADMIN;
  return Object.values(roles);
}

module.exports = {
  handleAsyncFunction,
  getUserRoles,
};
