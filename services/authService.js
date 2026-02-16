const UserModel = require('../models/userModel');
const passwordHelper = require('../utils/passwordHelper');

const authServiceObj = {};

authServiceObj.login = async (reqBody) => {
  const user = await UserModel.find({
    email: reqBody.email,
  });
  let isAuthenticated = false;
  isAuthenticated = await passwordHelper.comparePassword(reqBody.password, user[0].password);

  if (!user || user.length !== 1 || !isAuthenticated) {
    throw new Error('Unauthorized');
  }
};

authServiceObj.register = async (reqBody) => {
  reqBody.password = await passwordHelper.generatePasswordHash(reqBody.password);
  let user = new UserModel(reqBody);
  user = user.save();
  return user;
};

module.exports = authServiceObj;
