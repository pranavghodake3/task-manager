const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { handleAsyncFunction } = require('../utils/commonHelper');
const { hasAccess } = require('../middlewares/authMiddleware');
const { ENTITIES, ACTION_TYPES } = require('../constants');

router.get(
  '/',
  hasAccess(ENTITIES.TASK, ACTION_TYPES.READ),
  handleAsyncFunction(taskController.getTasks),
);

router.get(
  '/:id',
  hasAccess(ENTITIES.TASK, ACTION_TYPES.READ),
  handleAsyncFunction(taskController.getTaskById),
);

router.get(
  '/:id/comments',
  hasAccess(ENTITIES.TASK_COMMENT, ACTION_TYPES.READ_ALL),
  handleAsyncFunction(taskController.getTaskComments),
);

router.post(
  '/:id/comments',
  hasAccess(ENTITIES.TASK_COMMENT, ACTION_TYPES.CREATE),
  handleAsyncFunction(taskController.createTaskComment),
);

router.post(
  '/',
  hasAccess(ENTITIES.TASK, ACTION_TYPES.CREATE),
  handleAsyncFunction(taskController.createTask),
);

router.put(
  '/:id',
  hasAccess(ENTITIES.TASK, ACTION_TYPES.UPDATE),
  handleAsyncFunction(taskController.updateTask),
);

router.delete(
  '/:id',
  hasAccess(ENTITIES.TASK, ACTION_TYPES.DELETE),
  handleAsyncFunction(taskController.deleteTask),
);

module.exports = router;
