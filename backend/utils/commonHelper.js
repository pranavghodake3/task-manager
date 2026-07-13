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

const isSuperOrCompanyAdmin = (user) => {
  return [GLOBAL_ROLES.SUPER_ADMIN, GLOBAL_ROLES.COMPANY_ADMIN].includes(user.globalRole.name);
}

module.exports = {
  handleAsyncFunction,
  getUserRoles,
  isSuperOrCompanyAdmin,
};
