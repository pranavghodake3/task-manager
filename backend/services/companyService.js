const db = require('../models');
const UserModel = db.User;

const companyService = {};

companyService.getUsers = async (companyId) => {
    const users = await UserModel.findAll({
        where: {
            companyId
        }
    });

    return users;
}

module.exports =companyService;
