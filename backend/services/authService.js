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
        as: 'roleInfo'
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

  return {
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.roleInfo
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
      role: superAdminRole.id,
    },
  });

  if (existingSuperAdmin) {
    throw new CustomError('Super Admin exists already', 400, { email: existingSuperAdmin.email });
  }

  const user = await UserModel.create({
    ...reqBody,
    role: superAdminRole.id,
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
    role: reqBody.roleId ?? null,
  });

  return user;
};

authServiceObj.registerCompany = async (reqBody) => {
  const companyAdminRole = await roleService.getCompanyAdminRole();

  if (!companyAdminRole) {
    throw new CustomError('Company admin role is not configured', 500);
  }

  const { name, ...userData } = reqBody;
  userData.password = await passwordHelper.generatePasswordHash(reqBody.password);

  const user = await UserModel.create({
    ...userData,
    role: companyAdminRole.id,
  });

  await CompanyModel.create({
    name,
    admin: user.id,
  });

  delete reqBody.name;

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

module.exports = authServiceObj;
