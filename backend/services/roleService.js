const { ROLES, GLOBAL_ROLES } = require('../constants');
const db = require('../models');
const RoleModel = db.Role;

const roleService = {};

roleService.getRole = async (id) => {
  return await RoleModel.findOne({
    where: {
      id,
    },
  });
};

roleService.getSuperAdminRole = async () => {
  return await db.GlobalRole.findOne({
    where: {
      name: GLOBAL_ROLES.SUPER_ADMIN,
    },
  });
};

roleService.getCompanyAdminRole = async () => {
  return await db.GlobalRole.findOne({
    where: {
      name: GLOBAL_ROLES.COMPANY_ADMIN,
    },
  });
};

roleService.getManagerRole = async () => {
  return await RoleModel.findOne({
    where: {
      name: ROLES.MANAGER,
    },
  });
};

roleService.getUserRole = async () => {
  return await RoleModel.findOne({
    where: {
      name: ROLES.USER,
    },
  });
};

module.exports = roleService;
