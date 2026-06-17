const { ROLES } = require('../constants');
const db = require('../models');
const ProjectModel = db.Project;
const UserProjectModel = require('../models/UserProjectModel');
const { getMyCompany } = require('./companyService');

const projectService = {};

projectService.getProjects = async ({ userId, role, companyId }) => {
  if(role === ROLES.COMPANY_ADMIN){
    companyId = (await getMyCompany(userId)).id;
  }
  const where = {
    ...(companyId && { companyId })
  };
  return await ProjectModel.findAll({
    ...(where && { where }),
  });
};

projectService.getProjectById = async (id) => {
  return await ProjectModel.findByPk(id);
};

projectService.createProject = async (companyId, reqBody) => {
  reqBody.companyId = companyId;
  const project = await ProjectModel.create(reqBody);
  return project;
};

projectService.updateProject = async (id, reqBody) => {
  await ProjectModel.update(reqBody, {
    where: { id },
  });
  return await ProjectModel.findByPk(id);
};

projectService.deleteProject = async (id) => {
  await ProjectModel.destroy({
    where: { id },
  });
  await UserProjectModel.destroy({
    where: {
      project: id,
    },
  });
};

module.exports = projectService;
