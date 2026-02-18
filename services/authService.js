const UserModel = require('../models/userModel');
const RefreshTokenModel = require('../models/refreshToken');
const passwordHelper = require('../utils/passwordHelper');
const CustomError = require('../utils/CustomError');
const jwtUtil = require('../utils/jwtUtil');

const authServiceObj = {};

authServiceObj.login = async (reqBody) => {
  const user = await UserModel.find({
    email: reqBody.email,
  })
    .limit(1)
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

authServiceObj.register = async (reqBody) => {
  reqBody.password = await passwordHelper.generatePasswordHash(reqBody.password);
  let user = new UserModel(reqBody);
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
