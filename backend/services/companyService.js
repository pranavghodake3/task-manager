const db = require('../models');
const UserModel = db.User;
const CompanyModel = db.Company;
const passwordHelper = require('../utils/passwordHelper');

const companyService = {};

companyService.getUsers = async (companyId) => {
    const users = await UserModel.findAll({
        where: {
            companyId
        },
        include: [
            {
                model: db.GlobalRole,
                as: 'globalRole'
            }
        ]
    });

    return users;
};

companyService.addUsers = async (reqBody) => {
    reqBody.password = await passwordHelper.generatePasswordHash(reqBody.password);
    const user = await UserModel.create(reqBody);

    return user;
};

companyService.updateUsers = async (id, reqBody) => {
    reqBody.password = await passwordHelper.generatePasswordHash(reqBody.password);
    await UserModel.update(reqBody, {
        where: { id },
    });

    return reqBody;
};

companyService.getMyCompany = async (userId) => {
    const company = await CompanyModel.findOne({
        where: {
            admin: userId
        }
    });

    return company.get({
        plain: true
    });
}

module.exports =companyService;
