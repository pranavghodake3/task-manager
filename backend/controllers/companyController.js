const companyService = require('../services/companyService');

const companyController = {};

companyController.getUsers = async (req) => {
    const { companyId } = req.params;
    const companyUsers = await companyService.getUsers(companyId);
    return {
        data: companyUsers
    };
};

companyController.addUsers = async (req) => {
    const { companyId } = req.params;
    req.body.companyId = companyId;
    const user = await companyService.addUsers(req.body);
    return {
        data: user
    };
}

module.exports = companyController;
