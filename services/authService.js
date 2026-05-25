const UserModel = require('../models/UserModel');
const RefreshTokenModel = require('../models/RefreshTokenModel');
const UserProjectModel = require('../models/UserProjectModel');
// const ProjectModel = require('../models/ProjectModel');
const CompanyModel = require('../models/CompanyModel');
const passwordHelper = require('../utils/passwordHelper');
const CustomError = require('../utils/CustomError');
const jwtUtil = require('../utils/jwtUtil');
const roleService = require('../services/roleService');

const authServiceObj = {};

authServiceObj.login = async (reqBody) => {
  const user = await UserModel.findOne({
    where: {
      email: reqBody.email,
    },
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
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
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
