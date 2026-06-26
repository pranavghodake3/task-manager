const { GLOBAL_ROLES } = require('../constants');
const db = require('../models/index');
const { getUserRoles } = require('../utils/commonHelper');
const UserModel = db.User;
const RoleModel = db.Role;
const passwordHelper = require('../utils/passwordHelper');

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

userService.createUser = async (auth, reqBody) => {
  const projectUserRole = await db.GlobalRole.findOne({
    attributes: ['id'],
    where: {
      name: GLOBAL_ROLES.PROJECT_USER,
    },
  });
  reqBody.password = await passwordHelper.generatePasswordHash(reqBody.password);
  reqBody.globalRoleId = projectUserRole.id;
  reqBody.companyId = auth.user.company.id;
  reqBody.isActive = true;
  const result = db.sequelize.transaction(async (t) => {
    const user = await UserModel.create(reqBody, { transaction: t });
    const projectMembership = await db.ProjectMember.create({
      userId: user.id,
      projectId: parseInt(reqBody.projectId),
      roleId: parseInt(reqBody.roleId),
    }, { transaction: t });
    return { user, projectMembership };
  });
  return result;
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
