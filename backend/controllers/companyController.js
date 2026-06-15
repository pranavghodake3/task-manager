const companyService = require('../services/companyService');

const companyController = {};

companyController.getUsers = async (req) => {
    const { companyId } = req.params;
    const companyUsers = await companyService.getUsers(companyId);
    return {
        data: companyUsers
    }
};

module.exports = companyController;
