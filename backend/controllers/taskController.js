const taskService = require('../services/taskService');

const taskController = {};

taskController.getTasks = async (req) => {
  const role = req.auth.user.roleInfo.name;
  const tasks = await taskService.getTasks({
    userId: req.auth.user.id,
    role,
  });
  return { data: tasks };
};

taskController.getTaskById = async (req) => {
  const { id } = req.params;
  const task = await taskService.getTaskById(id);
  return { data: task };
};

taskController.createTask = async (req) => {
  const role = req.auth.user.roleInfo.name;
  const task = await taskService.createTask(req.auth.user.id, role, req.body);
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
