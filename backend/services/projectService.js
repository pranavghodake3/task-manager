const { ROLES } = require('../constants');
const db = require('../models');
const ProjectModel = db.Project;
const { getMyCompany } = require('./companyService');

const projectService = {};

projectService.getProjects = async ({ userId, role, companyId, isDropdown = false }) => {
  if(role === ROLES.COMPANY_ADMIN){
    companyId = (await getMyCompany(userId)).id;
  }
  const where = {
    ...(companyId && { companyId })
  };
  let attributes = [];
  if(isDropdown){
    attributes = ['id', 'name'];
  }
  return await ProjectModel.findAll({
    ...(where && { where }),
    ...(attributes.length > 0 && { attributes }),
  });
};

projectService.getProjectById = async (id) => {
  return await ProjectModel.findByPk(id);
};

projectService.createProject = async (role, userId, reqBody) => {
  if(role === ROLES.COMPANY_ADMIN){
    reqBody.companyId = (await getMyCompany(userId)).id;
  }
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
};

module.exports = projectService;
