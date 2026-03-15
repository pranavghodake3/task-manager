const { successResponse, errorResponse } = require('../utils/responseHelper');
const projectService = require('../services/projectService');

const projectController = {};

projectController.getProjects = async (req, res) => {
  try {
    const { companyId } = req.params;
    const projects = await projectService.getProjects(companyId);
    return successResponse(res, projects);
  } catch (error) {
    return errorResponse(res, error, error.message, error.statusCode);
  }
};

projectController.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await projectService.getProjectById(id);
    return successResponse(res, project);
  } catch (error) {
    return errorResponse(res, error, error.message, error.statusCode);
  }
};

projectController.createProject = async (req, res) => {
  try {
    const { companyId } = req.params;
    const project = await projectService.createProject(companyId, req.body);
    return successResponse(res, project, 201);
  } catch (error) {
    return errorResponse(res, error, error.message, error.statusCode);
  }
};

projectController.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await projectService.updateProject(id, req.body);
    return successResponse(res, project);
  } catch (error) {
    return errorResponse(res, error, error.message, error.statusCode);
  }
};

projectController.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await projectService.deleteProject(id);
    return successResponse(res, undefined, 204);
  } catch (error) {
    return errorResponse(res, error, error.message, error.statusCode);
  }
};

module.exports = projectController;
