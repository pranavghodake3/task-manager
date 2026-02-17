const UserModel = require('../models/userModel');
const passwordHelper = require('../utils/passwordHelper');
const CustomError = require('../utils/CustomError');

const authServiceObj = {};

authServiceObj.login = async (reqBody) => {
  const user = await UserModel.find({
    email: reqBody.email,
  });
  let isAuthenticated = false;
  isAuthenticated = await passwordHelper.comparePassword(reqBody.password, user[0].password);

  if (!isAuthenticated) {
    throw new CustomError('Invalid Password for this email', 401);
  }
};

authServiceObj.register = async (reqBody) => {
  reqBody.password = await passwordHelper.generatePasswordHash(reqBody.password);
  let user = new UserModel(reqBody);
  user = user.save();
  return user;
};

module.exports = authServiceObj;
