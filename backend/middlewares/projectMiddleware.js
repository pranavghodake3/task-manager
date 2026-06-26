const { errorResponse } = require('../utils/responseHelper');
const db = require('../models');
// const ProjectModel = db.Project;
const CompanyModel = db.Company;
const CustomError = require('../utils/CustomError');

const projectMiddleware = {};

projectMiddleware.isCompanyProjectValid = async (req, res, next) => {
  try {
    const { companyId } = req.params;
    const company = await CompanyModel.findByPk(companyId);
    if (!company) throw new CustomError('Company does not exists', 404);

    // const project = await ProjectModel.findByPk(id);
    // if (!project) throw new CustomError('Project does not exists', 404);

    // if (companyId && project.companyId.toString() !== companyId) {
    //   throw new CustomError('Incorrect Project/Company combination', 404);
    // }
    next();
  } catch (error) {
    return errorResponse(res, error);
  }
};

module.exports = projectMiddleware;
