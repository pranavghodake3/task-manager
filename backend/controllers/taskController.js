const logger = require('../config/logger');
const tasks = [];

const taskController = {};

taskController.getTasks = async () => {
  logger.info('Get Tasks Called');
  return { data: tasks };
};

taskController.getTaskById = async (req) => {
  const id = req.params.id;
  return { data: tasks[id] };
};

taskController.createTask = async (req) => {
  const task = req.body;
  tasks.push(task);
  return { data: task, statusCode: 201 };
};

taskController.updateTask = async (req) => {
  const task = req.body;
  return { data: task };
};

taskController.deleteTask = async (req) => {
  const id = req.params.id;
  return { data: tasks[id], statusCode: 204 };
};

module.exports = taskController;
