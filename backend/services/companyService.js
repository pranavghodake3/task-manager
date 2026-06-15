const db = require('../models');
const UserModel = db.User;
const passwordHelper = require('../utils/passwordHelper');

const companyService = {};

companyService.getUsers = async (companyId) => {
    const users = await UserModel.findAll({
        where: {
            companyId
        }
    });

    return users;
};

companyService.addUsers = async (reqBody) => {
    reqBody.password = await passwordHelper.generatePasswordHash(reqBody.password);
    const user = await UserModel.create(reqBody);

    return user;
};

module.exports =companyService;
