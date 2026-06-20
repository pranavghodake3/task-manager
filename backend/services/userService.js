const { ROLES } = require('../constants');
const db = require('../models/index');
const { getUserRoles } = require('../utils/commonHelper');
const { getMyCompany } = require('./companyService');
const UserModel = db.User;
const RoleModel = db.Role;

const userService = {};

userService.getUsers = async ({ userId, role, companyId, isDropdown = false }) => {
  if(role === ROLES.COMPANY_ADMIN){
    companyId = (await getMyCompany(userId)).id;
  }
  const where = {
    ...(companyId && { companyId })
  };
  let attributes = [];
  let include = [];
  if(isDropdown){
    attributes = ['id', 'firstName', 'lastName'];
  }else{
    include.push({
      model: RoleModel,
      as: 'roleInfo'
    });
  }
  return await UserModel.findAll({
    ...(where && { where }),
    ...(attributes.length > 0 && { attributes }),
    ...(include.length > 0 && { include })
  });
};

userService.getUserRoles = async () => {
    const roles = await RoleModel.findAll({
        where: {
            name: getUserRoles()
        }
    });
    return roles;
};

userService.getUserById = async (id) => {
  return await UserModel.findByPk(id, {
    include: [
      {
        model: RoleModel,
        as: 'roleInfo'
      }
    ]
  });
};

userService.updateUser = async (id, reqBody) => {
  await UserModel.update(reqBody, {
    where: { id },
  });
  return reqBody;
};

userService.deleteUser = async (id) => {
  await UserModel.destroy({
    where: { id },
  });
};

userService.getUserByIdWithRole = async (userId) => {
    const user = await UserModel.findOne({
        attributes: ['id', 'firstName', 'lastName', 'email'],
        where: {
            id: userId,
        },
        include: [
            {
            model: RoleModel,
            as: 'roleInfo'
            }
        ]
    });
    return user.get({
        plain: true
    });
};

module.exports = userService;
