const projectService = require('../services/projectService');

const projectController = {};

projectController.getProjects = async (req) => {
  const { companyId } = req.query;
  const role = req.auth.user.roleInfo.name;
  const projects = await projectService.getProjects({
    userId: req.auth.user.id,
    role,
    companyId
  });
  return { data: projects };
};

projectController.getProjectById = async (req) => {
  const { id } = req.params;
  const project = await projectService.getProjectById(id);
  return { data: project };
};

projectController.createProject = async (req) => {
  const { companyId } = req.params;
  const project = await projectService.createProject(companyId, req.body);
  return { data: project, statusCode: 201 };
};

projectController.updateProject = async (req) => {
  const { id } = req.params;
  const project = await projectService.updateProject(id, req.body);
  return { data: project };
};

projectController.deleteProject = async (req) => {
  const { id } = req.params;
  await projectService.deleteProject(id);
  return { statusCode: 204 };
};

module.exports = projectController;
