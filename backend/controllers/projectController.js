const projectService = require('../services/projectService');
const makeBoolean = require('../utils/booleanHelper');

const projectController = {};

projectController.getProjects = async (req) => {
  const { auth } = req;
  const companyId = req.query.companyId ?? auth.user.company?.id;
  let { isDropdown } = req.query;
  isDropdown = makeBoolean(isDropdown);
  console.log('companyId', companyId);
  console.log('isDropdown', isDropdown);
  const projects = await projectService.getProjects({
    auth,
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

projectController.addMemberToProject = async (req) => {
  const { id } = req.params;
  const projectMemberShip = await projectService.addMemberToProject(id, req.body);
  return { data: projectMemberShip };
}

projectController.removeMemberFromProject = async (req) => {
  const { id, userId } = req.params;
  await projectService.removeMemberFromProject(id, userId);
  return { statusCode: 204 };
}

projectController.createProject = async (req) => {
  const { auth } = req;
  const project = await projectService.createProject(auth, req.body);
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
