const { ROLES } = require('../constants');
const db = require('../models');
const TaskModel = db.Task;
const StatusModel = db.Status;
const PriorityModel = db.Priority;
const ProjectModel = db.Project;
const UserModel = db.User;
const { getMyCompany } = require('./companyService');

const taskService = {};

taskService.getTasks = async ({ userId, companyId, role }) => {
    if(role === ROLES.COMPANY_ADMIN){
        companyId = (await getMyCompany(userId)).id;
    }
    const where = {
    ...(companyId && { companyId })
  };
  if(![ROLES.SUPER_ADMIN, ROLES.COMPANY_ADMIN].includes(role)){
    where.userId = userId;
  }
  return await TaskModel.findAll({
    ...(where && { where }),
    include: [
        {
            model: StatusModel,
            as: 'status'
        },
        {
          model: PriorityModel,
          as: 'priority'
        },
        {
          model: ProjectModel,
          as: 'project'
        },
        {
          model: UserModel,
          as: 'user'
        },
        {
            model: UserModel,
            as: 'creator'
        }
    ]
  });
};

taskService.getTaskById = async (id) => {
  return await TaskModel.findByPk(id, {
    include: [
        {
            model: StatusModel,
            as: 'status'
        },
        {
          model: PriorityModel,
          as: 'priority'
        },
        {
          model: ProjectModel,
          as: 'project'
        },
        {
          model: UserModel,
          as: 'user'
        },
        {
            model: UserModel,
            as: 'creator'
        }
    ]
  });
};

taskService.createTask = async (loggedInUserId, role, reqBody) => {
    reqBody.creatorId = loggedInUserId;
    if(role === ROLES.COMPANY_ADMIN){
        reqBody.companyId = (await getMyCompany(loggedInUserId)).id;
    }
  const task = await TaskModel.create(reqBody);
  return task;
};

taskService.updateTask = async (id, reqBody) => {
  await TaskModel.update(reqBody, {
    where: { id },
  });
  return { id, ...reqBody};
};

taskService.deleteTask = async (id) => {
  await TaskModel.destroy({
    where: { id },
  });
};

module.exports = taskService;
