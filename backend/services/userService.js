const { GLOBAL_ROLES } = require('../constants');
const db = require('../models/index');
const { getUserRoles } = require('../utils/commonHelper');
const UserModel = db.User;
const RoleModel = db.Role;

const userService = {};

userService.getUsers = async ({ auth, companyId, isDropdown = false }) => {
  const role = auth.user.globalRole.name;
  companyId = companyId || auth.user?.company?.id;
  const where = {
    ...(companyId && { companyId }),
  };

  if(role === GLOBAL_ROLES.SUPER_ADMIN){
    where.globalRoleId = {[db.Sequelize.Op.ne]: 1 }
  }else if(role === GLOBAL_ROLES.COMPANY_ADMIN){
    where.globalRoleId = {[db.Sequelize.Op.notIn]: [1, 2] }
  }
  let attributes = [];
  let include = [];
  if(isDropdown){
    attributes = ['id', 'firstName', 'lastName'];
  }else{
    include.push({
      model: db.GlobalRole,
      as: 'globalRole'
    });
    include.push({
      model: db.Role,
      as: 'roles'
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
        model: db.GlobalRole,
        as: 'globalRole'
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
              model: db.GlobalRole,
              as: 'globalRole',
              attributes: ['id', 'name'],
            },
            {
              model: db.Company,
              as: 'company',
              attributes: ['id', 'name'],
            }
        ]
    });
    return user.get({
        plain: true
    });
};

module.exports = userService;
