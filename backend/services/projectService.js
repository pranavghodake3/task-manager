const db = require('../models');
const ProjectModel = db.Project;
const UserProjectModel = require('../models/UserProjectModel');

const projectService = {};

projectService.getProjects = async (companyId) => {
  return await ProjectModel.findAll({
    where: {
      company: companyId,
    },
  });
};

projectService.getProjectById = async (id) => {
  return await ProjectModel.findByPk(id);
};

projectService.createProject = async (companyId, reqBody) => {
  reqBody.company = companyId;
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
