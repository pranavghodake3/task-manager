const { errorResponse } = require('../utils/responseHelper');
const CompanyModel = require('../models/CompanyModel');
const ProjectModel = require('../models/ProjectModel');
const CustomError = require('../utils/CustomError');

const projectMiddleware = {};

projectMiddleware.isCompanyProjectValid = async (req, res, next) => {
  try {
    const { companyId, id } = req.params;
    const company = await CompanyModel.findById(companyId);
    if (!company) throw new CustomError('Company does not exists', 404);

    const project = await ProjectModel.findById(id).lean().exec();
    if (!project) throw new CustomError('Project does not exists', 404);

    if (companyId && project.company.toString() !== companyId) {
      throw new CustomError('Incorrect Project/Company combination', 404);
    }
    next();
  } catch (error) {
    return errorResponse(res, error);
  }
};

module.exports = projectMiddleware;
