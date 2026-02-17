const UserModel = require('../models/userModel');
const passwordHelper = require('../utils/passwordHelper');
const CustomError = require('../utils/CustomError');
const jwtUtil = require('../utils/jwtUtil');
const { TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } = require('../constants/index');

const authServiceObj = {};

authServiceObj.login = async (reqBody) => {
  const user = await UserModel.find({
    email: reqBody.email,
  })
    .limit(1)
    .lean()
    .exec();
  let isAuthenticated = false;
  isAuthenticated = await passwordHelper.comparePassword(reqBody.password, user[0].password);

  if (!isAuthenticated) {
    throw new CustomError('Invalid Password for this email', 401);
  }
  return {
    token: jwtUtil.getToken({ user: user[0] }, TOKEN_EXPIRY),
    refreshToken: jwtUtil.getToken({ refreshToken: true, user: user[0] }, REFRESH_TOKEN_EXPIRY),
    tokenExpiresIn: TOKEN_EXPIRY,
    RefreshokenExpiresIn: REFRESH_TOKEN_EXPIRY,
  };
};

authServiceObj.register = async (reqBody) => {
  reqBody.password = await passwordHelper.generatePasswordHash(reqBody.password);
  let user = new UserModel(reqBody);
  user = user.save();
  return user;
};

authServiceObj.getRefreshToken = async (req) => {
  return {
    token: jwtUtil.getToken({ user: req.auth.user }, TOKEN_EXPIRY),
    expiresIn: TOKEN_EXPIRY,
  };
};

module.exports = authServiceObj;
