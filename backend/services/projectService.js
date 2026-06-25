const { ROLES, JOB_TITLE } = require('../constants');
const db = require('../models');
const ProjectModel = db.Project;
const roleHelper = require('../helpers/roleHelper');

const projectService = {};

projectService.getProjects = async ({ companyId, isDropdown = false }) => {
  const where = {
    ...(companyId && { companyId })
  };
  let attributes = [];
  let include = [];
  if(isDropdown){
    attributes = ['id', 'name'];
  }else{
    include = [
      {
        model: db.User,
        as: 'createdBy',
        attributes: ['id', 'firstName', 'lastName', 'email'],
      },
      {
        model: db.User,
        as: 'users',
        attributes: ['id', 'firstName', 'lastName', 'email'],
      }
    ];
  }
  
  return await ProjectModel.findAll({
    ...(where && { where }),
    ...(attributes.length > 0 && { attributes }),
    ...(include.length > 0 && { include }),
  });
};

projectService.getProjectById = async (id) => {
  return await ProjectModel.findByPk(id, {
    include: [
      {
        model: db.User,
        as: 'createdBy',
        attributes: ['id', 'firstName', 'lastName', 'email'],
      }
    ]
  });
};

projectService.createProject = async (auth, reqBody) => {
  const { user } = auth;
  const t = await db.sequelize.transaction();
  try {
    reqBody.companyId = user.company.id;
    reqBody.createdById = user.id;
    reqBody.key = reqBody.name.toUpperCase().replace(/\s+/g, '-');

    const project = await ProjectModel.create(reqBody, { transaction: t });

    if(reqBody.projectAdminId){
      const projectAdminRole = await roleHelper.getRoleByName(ROLES.PROJECT_ADMIN);
      const jobTitle = await roleHelper.getJobTitleByName(JOB_TITLE.PRODUCT_OWNER);
      await db.ProjectMember.create({
        userId: parseInt(reqBody.projectAdminId),
        projectId: project.id,
        roleId: projectAdminRole.id,
        jobTitleId: jobTitle.id
      }, { transaction: t });
    }

    await t.commit();
    return project;
  } catch (error) {
    await t.rollback();
    throw error;
  }
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
