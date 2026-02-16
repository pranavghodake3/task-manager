const UserModel = require('../models/userModel');

const authServiceObj = {};

authServiceObj.login = async (reqBody) => {
  return reqBody;
};

authServiceObj.register = async (reqBody) => {
  let user = new UserModel(reqBody);
  user = user.save();
  return user;
};

module.exports = authServiceObj;
