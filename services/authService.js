const UserModel = require('../models/UserModel');
const RefreshTokenModel = require('../models/RefreshTokenModel');
const CompanyModel = require('../models/CompanyModel');
const passwordHelper = require('../utils/passwordHelper');
const CustomError = require('../utils/CustomError');
const jwtUtil = require('../utils/jwtUtil');
const roleService = require('../services/roleService');

const authServiceObj = {};

authServiceObj.login = async (reqBody) => {
  const user = await UserModel.find({
    email: reqBody.email,
  })
    .limit(1)
    .populate('role')
    .lean()
    .exec();
  const isAuthenticated = await passwordHelper.comparePassword(reqBody.password, user[0].password);

  if (!isAuthenticated) {
    throw new CustomError('Invalid Password for this email', 401);
  }
  await RefreshTokenModel.deleteMany({
    userId: user[0]._id,
  });
  const { refreshToken, refreshTokenExpiresIn } = jwtUtil.getRefreshToken({ userId: user[0]._id });
  const { accessToken, accessTokenExpiresIn } = jwtUtil.getToken({ userId: user[0]._id });
  const refreshTokenObj = new RefreshTokenModel({
    refreshToken,
    userId: user[0]._id,
    expiresAt: refreshTokenExpiresIn,
  });
  refreshTokenObj.save();

  return {
    accessToken,
    refreshToken,
    accessTokenExpiresIn,
    refreshTokenExpiresIn,
  };
};

authServiceObj.registerSuperAdmin = async (reqBody) => {
  reqBody.password = await passwordHelper.generatePasswordHash(reqBody.password);
  const superAdminRole = await roleService.getSuperAdminRole();
  const superAdmin = await UserModel.find({
    role: superAdminRole._id,
  });
  if (superAdmin.length > 0) {
    throw new CustomError('Super Admin exists already', 400, { email: superAdmin[0].email });
  }
  let user = new UserModel({
    ...reqBody,
    role: superAdminRole._id,
  });
  user = user.save();
  return user;
};

authServiceObj.registerCompany = async (reqBody) => {
  reqBody.password = await passwordHelper.generatePasswordHash(reqBody.password);
  let company = new CompanyModel({
    name: reqBody.name,
  });
  const companyAdminRole = await roleService.getCompanyAdminRole();
  company.save();
  let user = new UserModel({
    ...reqBody,
    role: companyAdminRole._id,
  });
  user = user.save();
  return user;
};

authServiceObj.registerCompanyUser = async (reqBody) => {
  reqBody.password = await passwordHelper.generatePasswordHash(reqBody.password);
  const userRole = await roleService.getUserRole();
  let user = new UserModel({
    ...reqBody,
    role: userRole._id,
  });
  user = user.save();
  return user;
};

authServiceObj.getRefreshToken = async (req) => {
  await RefreshTokenModel.deleteMany({
    userId: req.auth.user.userId,
  });
  const { refreshToken, refreshTokenExpiresIn } = jwtUtil.getRefreshToken({
    userId: req.auth.user.userId,
  });
  const { accessToken, accessTokenExpiresIn } = jwtUtil.getToken({ userId: req.auth.user.userId });
  const refreshTokenObj = new RefreshTokenModel({
    refreshToken,
    userId: req.auth.user.userId,
    expiresAt: refreshTokenExpiresIn,
  });
  refreshTokenObj.save();
  return {
    accessToken,
    refreshToken,
    accessTokenExpiresIn,
    refreshTokenExpiresIn,
  };
};

module.exports = authServiceObj;
