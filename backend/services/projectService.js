const { GLOBAL_ROLES } = require('../constants');
const db = require('../models');
const ProjectModel = db.Project;
const CustomError = require('../utils/CustomError');

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

    await t.commit();
    return project;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

projectService.addMemberToProject = async (projectId, reqBody) => {
  const t = await db.sequelize.transaction();
  try {
    const existingProjectMembership = await db.ProjectMember.findOne({
      where: {
        userId: reqBody.userId,
        projectId: projectId,
      }
    });
    if (existingProjectMembership) {
      throw new CustomError('User is already a Member of this Project', 400);
    }
    const projectMembership = await db.ProjectMember.create({
      userId: reqBody.userId,
      projectId: projectId,
      roleId: reqBody.roleId,
      jobTitleId: reqBody.jobTitleId,
    }, { transaction: t });
    await t.commit();
    return projectMembership;
  } catch (error) {
    t.rollback();
    console.log('Error while adding user to project: ',error);
    throw new CustomError(error.message, error.statusCode);
  }
}

projectService.updateProject = async (id, reqBody) => {
  const t = await db.sequelize.transaction();
  try {
    await ProjectModel.update(reqBody, {
      where: { id },
    }, { transaction: t });

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

projectService.removeMemberFromProject = async (projectId, userId) => {
  const t = await db.sequelize.transaction();
  try {
    const existingProjectMembership = await db.ProjectMember.findOne({
      where: {
        userId,
        projectId,
      }
    });
    if (!existingProjectMembership) {
      throw new CustomError('User is not a Member of this Project', 400);
    }
    await db.ProjectMember.destroy({
      where: {
        userId,
        projectId,
      }
    }, { transaction: t });
    await t.commit();
  } catch (error) {
    t.rollback();
    console.log('Error while removing a user from project: ',error);
    throw new CustomError(error.message, error.statusCode);
  }
}

module.exports = projectService;
