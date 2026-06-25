const db = require('../models');
const ProjectModel = db.Project;

const projectService = {};

projectService.getProjects = async ({ companyId, isDropdown = false }) => {
  const where = {
    ...(companyId && { companyId })
  };
  let attributes = [];
  if(isDropdown){
    attributes = ['id', 'name'];
  }
  console.log('where', where);
  console.log('isDropdown', isDropdown);
  
  return await ProjectModel.findAll({
    ...(where && { where }),
    ...(attributes.length > 0 && { attributes }),
  });
};

projectService.getProjectById = async (id) => {
  return await ProjectModel.findByPk(id);
};

projectService.createProject = async (auth, reqBody) => {
  const { user } = auth;
  reqBody.companyId = user.company.id;
  reqBody.createdById = user.id;
  reqBody.key = reqBody.name.toUpperCase().replace(/\s+/g, '-');
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
