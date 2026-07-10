const { GLOBAL_ROLES } = require('../constants');
const db = require('../models');
const TaskModel = db.Task;
const StatusModel = db.Status;
const PriorityModel = db.Priority;
const ProjectModel = db.Project;
const UserModel = db.User;

const taskService = {};

taskService.getTasks = async ({ auth, companyId }) => {
    const where = {
        companyId: companyId || auth.user?.company?.id,
  };
  if(![GLOBAL_ROLES.SUPER_ADMIN, GLOBAL_ROLES.COMPANY_ADMIN].includes(auth.user.globalRole.name)){
    where.userId = auth.user.id;
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

taskService.createTask = async (auth, reqBody) => {
  reqBody.creatorId = auth.user.id;
  reqBody.companyId = auth.user.company.id;
  for (const key in reqBody) {
    reqBody[key] = reqBody[key] ? reqBody[key] : null;
  }
  console.log('reqBody: ',reqBody);

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
