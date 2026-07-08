const { ROLES, JOB_TITLE, GLOBAL_ROLES } = require('../constants');
const db = require('../models');
const ProjectModel = db.Project;
const roleHelper = require('../helpers/roleHelper');
const makeBoolean = require('../utils/booleanHelper');
const passwordHelper = require('../utils/passwordHelper');

const projectService = {};

projectService.getProjects = async ({ auth, companyId, isDropdown = false }) => {
  const where = {
    ...(companyId && { companyId })
  };
  if(![GLOBAL_ROLES.SUPER_ADMIN, GLOBAL_ROLES.COMPANY_ADMIN].includes(auth.user.globalRole.name)){
    where.id = await projectService.getMyProjectIds(auth);
  }
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
    ];
  }
  
  return await ProjectModel.findAll({
    ...(where && { where }),
    ...(attributes.length > 0 && { attributes }),
    ...(include.length > 0 && { include }),
  });
};

projectService.getMyProjectIds = async (auth) => {
  const projects = await db.ProjectMember.findAll({
    attributes: ['projectId'],
    where: {
      userId: auth.user.id,
    },
    raw: true,
  });
  return projects.map(projectMember => projectMember.projectId);
}

projectService.getProjectById = async (id) => {
  return await ProjectModel.findByPk(id, {
    include: [
      {
        model: db.User,
        as: 'createdBy',
        attributes: ['id', 'firstName', 'lastName', 'email'],
      },
      {
        model: db.ProjectMember,
        as: 'projectMembers',
        include: [
          {
            model: db.User,
            as: 'user',
            attributes: ['id', 'firstName', 'lastName', 'email'],
          },
          {
            model: db.JobTitle,
            as: 'jobTitle'
          },
          {
            model: db.Role,
            as: 'role'
          }
        ]
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
    const jobTitle = await roleHelper.getJobTitleByName(JOB_TITLE.PRODUCT_OWNER);
    const projectAdminRole = await roleHelper.getRoleByName(ROLES.PROJECT_ADMIN);

    let projectAdminId;

    if(makeBoolean(reqBody.createNew)){
      const projectUserRole = await db.GlobalRole.findOne({
        attributes: ['id'],
        where: {
          name: GLOBAL_ROLES.PROJECT_USER,
        },
      });
      reqBody.password = await passwordHelper.generatePasswordHash(reqBody.password);
      reqBody.globalRoleId = projectUserRole.id;
      reqBody.companyId = auth.user.company.id;
      reqBody.isActive = true;
      const user = await db.User.create(reqBody, { transaction: t });
      projectAdminId = user.id;
      
    }else{
      projectAdminId = parseInt(reqBody.projectAdminId);
    }
    const projectMembership = await db.ProjectMember.create({
      userId: projectAdminId,
      projectId: project.id,
      roleId: projectAdminRole.id,
      jobTitleId: jobTitle.id
    }, { transaction: t });

    await t.commit();
    return { project, projectMembership };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

projectService.updateProject = async (id, reqBody) => {
  const t = await db.sequelize.transaction();
  try {
    await ProjectModel.update(reqBody, {
      where: { id },
    }, { transaction: t });
    if(reqBody.existingProjectMemberUserId){
      await db.ProjectMember.update({
        userId: reqBody.projectAdminId
      }, {
        where: {
          userId: reqBody.existingProjectMemberUserId,
          projectId: id,
        }
      }, { transaction: t });
    }else{
      const jobTitle = await roleHelper.getJobTitleByName(JOB_TITLE.PRODUCT_OWNER);
      const projectAdminRole = await roleHelper.getRoleByName(ROLES.PROJECT_ADMIN);
      await db.ProjectMember.create({
        userId: reqBody.projectAdminId,
        projectId: id,
        roleId: projectAdminRole.id,
        jobTitleId: jobTitle.id
      }, { transaction: t });
    }

    await t.commit();

    return {id, ...reqBody};
  } catch (error) {
    console.log('Erro Updating Project: ',error)
    await t.rollback();
  }
};

projectService.deleteProject = async (id) => {
  await ProjectModel.destroy({
    where: { id },
  });
};

module.exports = projectService;
