const { Op } = require('sequelize');
const { GLOBAL_ROLES } = require('../constants');
const db = require('../models/index');
const { getUserRoles } = require('../utils/commonHelper');
const UserModel = db.User;
const RoleModel = db.Role;
const passwordHelper = require('../utils/passwordHelper');

const userService = {};

userService.getUsers = async ({ auth, companyId, projectId, isDropdown = false }) => {
  const role = auth.user.globalRole.name;
  companyId = companyId || auth.user?.company?.id;
  const where = {
    ...(companyId && { companyId }),
  };
  if(projectId){
    let projectMembers = await db.ProjectMember.findAll({
      attributes: ['userId'],
      where: {
        projectId
      },
      raw: true,
    });
    const projectMemberIds = projectMembers.map(pm => pm.userId);
    if(projectMemberIds.length > 0){
      where.id = projectMemberIds;
    }
  }
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
    include.push({
      model: db.ProjectMember,
      as: 'projectMembership',
      where: {
        projectId: projectId,
      },
      include: [
        {
          model: db.Project,
          as: 'project'
        },
        {
          model: db.Role,
          as: 'role'
        },
        {
          model: db.JobTitle,
          as: 'jobTitle'
        }
      ]
    });
  }

  return await UserModel.findAll({
    ...(where && { where }),
    ...(attributes.length > 0 && { attributes }),
    ...(include.length > 0 && { include })
  });
};

userService.getUnAssignedUsers = async ({ auth }) => {
  let projectIds = await db.Project.findAll({
    attributes: ['id'],
    where: {
      companyId: auth.user.company.id
    }
  });
  projectIds = projectIds.map(p => p.id);
  let projectMemberIds = await db.ProjectMember.findAll({
      attributes: ['userId'],
      where: {
        projectId: projectIds
      },
    });
  projectMemberIds = projectMemberIds.map(pm => pm.userId);

  return await UserModel.findAll({
    attributes: ['id', 'firstName', 'lastName', 'email'],
    where: {
      id: {
        [Op.notIn]: projectMemberIds
      },
      globalRoleId: 3
    }
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
    return user;
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
            },
            {
              model: db.ProjectMember,
              as: 'projectMembership',
              include: [
                {
                  model: db.Project,
                  as: 'project'
                },
                {
                  model: db.Role,
                  as: 'role'
                },
                {
                  model: db.JobTitle,
                  as: 'jobTitle'
                }
              ]
            },
        ]
    });
    return user.get({
        plain: true
    });
};

module.exports = userService;
