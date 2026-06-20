const projectService = require('../services/projectService');
const makeBoolean = require('../utils/booleanHelper');

const projectController = {};

projectController.getProjects = async (req) => {
  const { companyId } = req.query;
  let { isDropdown } = req.query;
  isDropdown = makeBoolean(isDropdown);
  const role = req.auth.user.roleInfo.name;
  const projects = await projectService.getProjects({
    userId: req.auth.user.id,
    role,
    companyId,
    isDropdown,
  });
  return { data: projects };
};

projectController.getProjectById = async (req) => {
  const { id } = req.params;
  const project = await projectService.getProjectById(id);
  return { data: project };
};

projectController.createProject = async (req) => {
  const role = req.auth.user.roleInfo.name;
  const project = await projectService.createProject(role, req.auth.user.id, req.body);
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
