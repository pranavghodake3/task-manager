const { ROLES } = require('../constants');
const RoleModel = require('../models/RoleModel');

const roleService = {};

roleService.getSuperAdminRole = async () => {
  return await RoleModel.findOne({
    name: ROLES.SUPER_ADMIN,
  })
    .lean()
    .exec();
};

roleService.getCompanyAdminRole = async () => {
  return await RoleModel.findOne({
    name: ROLES.SUPER_ADMIN,
  })
    .lean()
    .exec();
};

roleService.getManagerRole = async () => {
  return await RoleModel.findOne({
    name: ROLES.SUPER_ADMIN,
  })
    .lean()
    .exec();
};

roleService.getUserRole = async () => {
  return await RoleModel.findOne({
    name: ROLES.SUPER_ADMIN,
  })
    .lean()
    .exec();
};

module.exports = roleService;
