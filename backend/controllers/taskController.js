const taskService = require('../services/taskService');
const { getIo } = require('../sockets/socket');


const taskController = {};

taskController.getTasks = async (req) => {
  const globalProjectId = req.cookies.globalProjectId;
  const io = getIo();
  const tasks = await taskService.getTasks({
    auth: req.auth,
    companyId: req.query.companyId,
    globalProjectId,
  });
  io.emit('notification', {
    message: 'TASK 1'
  })
  return { data: tasks };
};

taskController.getTaskById = async (req) => {
  const { id } = req.params;
  const task = await taskService.getTaskById(id);
  return { data: task };
};

taskController.createTask = async (req) => {
  const globalProjectId = req.cookies.globalProjectId;
  const task = await taskService.createTask(globalProjectId, req.auth, req.body);
  return { data: task, statusCode: 201 };
};

taskController.updateTask = async (req) => {
  const { id } = req.params;
  const task = await taskService.updateTask(id, req.body);
  return { data: task };
};

taskController.deleteTask = async (req) => {
  const { id } = req.params;
  await taskService.deleteTask(id);
  return { statusCode: 204 };
};

module.exports = taskController;
