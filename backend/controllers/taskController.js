const taskService = require('../services/taskService');
const { getIo } = require('../sockets/socket');

const taskController = {};

taskController.getTasks = async (req) => {
  const globalProjectId = req.cookies.globalProjectId;
  const tasks = await taskService.getTasks({
    auth: req.auth,
    companyId: req.query.companyId,
    globalProjectId,
  });
  return { data: tasks };
};

taskController.getTaskById = async (req) => {
  const { id } = req.params;
  const task = await taskService.getTaskById(id);
  return { data: task };
};

taskController.getTaskComments = async (req) => {
  const { id } = req.params;
  const taskComments = await taskService.getTaskComments(id);
  return { data: taskComments };
};

taskController.createTaskComment = async (req) => {
  const { id } = req.params;
  const globalProjectId = req.cookies.globalProjectId;
  const comment = await taskService.createTaskComment(id, req.auth, req.body);
  const io = getIo();
  const projectRoom = `project:${globalProjectId}`;
  const commentWithData = await taskService.getTaskCommentById(comment.id);
  io.to(projectRoom).emit('task_comment_added', commentWithData);

  return { data: comment, statusCode: 201 };
};

taskController.createTask = async (req) => {
  const globalProjectId = req.cookies.globalProjectId;
  const task = await taskService.createTask(globalProjectId, req.auth, req.body);
  const io = getIo();
  const projectRoom = `project:${globalProjectId}`;
  // const sockets = await io.in(projectRoom).fetchSockets();
  // console.log("SOCKETS to PROJECTROOM: ",sockets);
  // sockets.forEach(socket => {
  //     console.log(socket.id);
  //     console.log(socket.handshake); // Access handshake data
  //     console.log(socket.data);      // Access custom data attached to the socket
  // });
  const taskWithData = await taskService.getTaskById(task.id);
  io.to(projectRoom).emit('task_created', taskWithData);

  return { data: task, statusCode: 201 };
};

taskController.updateTask = async (req) => {
  const { id } = req.params;
  const globalProjectId = req.cookies.globalProjectId;
  const task = await taskService.updateTask(id, req.body);
  const taskWithData = await taskService.getTaskById(id);
  const io = getIo();
  const projectRoom = `project:${globalProjectId}`;
  io.to(projectRoom).emit('task_updated', taskWithData);

  return { data: task };
};

taskController.deleteTask = async (req) => {
  const globalProjectId = req.cookies.globalProjectId;
  const { id } = req.params;
  const io = getIo();
  await taskService.deleteTask(id);
  const projectRoom = `project:${globalProjectId}`;
  io.to(projectRoom).emit('task_deleted', { taskId: id });

  return { statusCode: 204 };
};

module.exports = taskController;
