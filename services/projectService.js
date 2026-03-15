const ProjectModel = require('../models/ProjectModel');
const UserProjectModel = require('../models/UserProjectModel');

const projectService = {};

projectService.getProjects = async (companyId) => {
  return await ProjectModel.find({
    company: companyId,
  })
    .lean()
    .exec();
};

projectService.getProjectById = async (id) => {
  return await ProjectModel.findById(id).lean().exec();
};

projectService.createProject = async (companyId, reqBody) => {
  reqBody.company = companyId;
  let project = new ProjectModel(reqBody);
  project = await project.save();
  return project;
};

projectService.updateProject = async (id, reqBody) => {
  return await ProjectModel.findByIdAndUpdate(id, reqBody).lean().exec();
};

projectService.deleteProject = async (id) => {
  await ProjectModel.findByIdAndDelete(id);
  await UserProjectModel.deleteMany({
    project: id,
  });
};

module.exports = projectService;
