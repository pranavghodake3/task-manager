const db = require('../models');
const UserModel = db.User;
const RefreshTokenModel = db.RefreshToken;
const UserProjectModel = db.UserProject;
// const ProjectModel = db.Project;
const CompanyModel = db.Company;
const RoleModel = db.Role;
const passwordHelper = require('../utils/passwordHelper');
const CustomError = require('../utils/CustomError');
const jwtUtil = require('../utils/jwtUtil');
const roleService = require('../services/roleService');
const permissionUtil = require('../utils/permission');

const authServiceObj = {};

authServiceObj.login = async (reqBody) => {
  const user = await UserModel.findOne({
    attributes: ['id', 'firstName', 'lastName', 'email', 'password'],
    where: {
      email: reqBody.email,
    },
    include: [
      {
        model: RoleModel,
        as: 'roles'
      },
      {
        model: CompanyModel,
        as: 'company'
      },
      {
        model: db.GlobalRole,
        as: 'globalRole'
      }
    ]
  });

  if (!user) {
    throw new CustomError('Invalid email or password', 401);
  }

  const isAuthenticated = await passwordHelper.comparePassword(reqBody.password, user.password);
  if (!isAuthenticated) {
    throw new CustomError('Invalid email or password', 401);
  }
  await RefreshTokenModel.destroy({
    where: {
      userId: user.id,
    },
  });

  const { refreshToken, refreshTokenExpiresIn } = jwtUtil.getRefreshToken({ userId: user.id });
  const { accessToken, accessTokenExpiresIn } = jwtUtil.getToken({ userId: user.id });

  await RefreshTokenModel.create({
    refreshToken,
    userId: user.id,
    expiresAt: refreshTokenExpiresIn,
  });
  // const permissions = [];
  // for (const entity in permissionUtil[user.globalRole.name]) {
  //   permissionUtil[user.globalRole.name][entity].forEach(action => {
  //     permissions.push(`${entity}:${action}`);
  //   });
  // } 

  return {
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      roles: user.roles,
      company: user.company,
      globalRole: user.globalRole,
      permissions: permissionUtil[user.globalRole.name] || {}, 
    },
    accessToken,
    refreshToken,
    accessTokenExpiresIn,
    refreshTokenExpiresIn,
  };
};

authServiceObj.registerSuperAdmin = async (reqBody) => {
  reqBody.password = await passwordHelper.generatePasswordHash(reqBody.password);
  const superAdminRole = await roleService.getSuperAdminRole();

  if (!superAdminRole) {
    throw new CustomError('Super admin role is not configured', 500);
  }

  const existingSuperAdmin = await UserModel.findOne({
    where: {
      globalRoleId: superAdminRole.id,
    },
  });

  if (existingSuperAdmin) {
    throw new CustomError('Super Admin exists already', 400, { email: existingSuperAdmin.email });
  }

  const user = await UserModel.create({
    ...reqBody,
    globalRoleId: superAdminRole.id,
    isActive: true,
  });

  return user;
};

authServiceObj.registerUser = async (reqBody) => {
  reqBody.password = await passwordHelper.generatePasswordHash(reqBody.password);
  if (reqBody.roleId) {
    const role = await roleService.getRole(reqBody.roleId);

    if (!role) {
      throw new CustomError('Role is not configured', 404);
    }
  }

  const user = await UserModel.create({
    ...reqBody,
    globalRoleId: reqBody.roleId ?? null,
    isActive: true,
  });

  return user;
};

authServiceObj.registerCompany = async (reqBody) => {
  const { name, ...userData } = reqBody;
  userData.password = await passwordHelper.generatePasswordHash(reqBody.password);
  const company = await CompanyModel.create({
    name,
  });
  const companyAdminRole = await roleService.getCompanyAdminRole();
  if (!companyAdminRole) {
    throw new CustomError('Company admin role is not configured', 500);
  }

  const user = await UserModel.create({
    ...userData,
    globalRoleId: companyAdminRole.id,
    companyId: company.id,
    isActive: true,
  });

  return user;
};

authServiceObj.registerCompanyProjectManager = async (req) => {
  const reqBody = req.body;
  const { projectId } = req.params;
  reqBody.password = await passwordHelper.generatePasswordHash(reqBody.password);
  const managerRole = await roleService.getManagerRole();

  if (!managerRole) {
    throw new CustomError('Manager role is not configured', 500);
  }

  const user = await UserModel.create({
    ...reqBody,
    role: managerRole.id,
  });

  await UserProjectModel.create({
    project: projectId,
    user: user.id,
  });

  return user;
};

authServiceObj.registerCompanyProjectUser = async (req) => {
  const reqBody = req.body;
  const { projectId } = req.params;
  reqBody.password = await passwordHelper.generatePasswordHash(reqBody.password);
  const userRole = await roleService.getUserRole();

  if (!userRole) {
    throw new CustomError('User role is not configured', 500);
  }

  const user = await UserModel.create({
    ...reqBody,
    role: userRole.id,
  });

  await UserProjectModel.create({
    project: projectId,
    user: user.id,
  });

  return user;
};

authServiceObj.getRefreshToken = async (req) => {
  const userId = Number(req.auth.user.userId);

  await RefreshTokenModel.destroy({
    where: {
      userId,
    },
  });

  const { refreshToken, refreshTokenExpiresIn } = jwtUtil.getRefreshToken({
    userId,
  });
  const { accessToken, accessTokenExpiresIn } = jwtUtil.getToken({ userId });

  await RefreshTokenModel.create({
    refreshToken,
    userId,
    expiresAt: refreshTokenExpiresIn,
  });

  return {
    accessToken,
    refreshToken,
    accessTokenExpiresIn,
    refreshTokenExpiresIn,
  };
};

authServiceObj.getRefreshAccessToken = async (req) => {
  const userId = Number(req.auth.user.userId);
  const user = await UserModel.findOne({
    attributes: ['id', 'firstName', 'lastName', 'email', 'password'],
    where: {
      id: userId,
    },
    include: [
      {
        model: RoleModel,
        as: 'roles'
      },
      {
        model: CompanyModel,
        as: 'company'
      },
      {
        model: db.GlobalRole,
        as: 'globalRole'
      }
    ]
  });

 

  const { accessToken, accessTokenExpiresIn } = jwtUtil.getToken({ userId });

  return {
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      roles: user.roles,
      company: user.company,
      globalRole: user.globalRole,
      permissions: permissionUtil[user.globalRole.name] || {}, 
    },
    accessToken,
    accessTokenExpiresIn,
  };
};

authServiceObj.logout = async (req) => {
  const userId = Number(req.auth.user.userId);
  const { accessToken, accessTokenExpiresIn } = jwtUtil.getToken({ userId });

  return {
    accessToken,
    accessTokenExpiresIn,
  };
};

module.exports = authServiceObj;
