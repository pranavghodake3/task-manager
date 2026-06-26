const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { handleAsyncFunction } = require('../utils/commonHelper');

router.get('/', handleAsyncFunction(taskController.getTasks));

router.get('/:id', handleAsyncFunction(taskController.getTaskById));

router.post('/', handleAsyncFunction(taskController.createTask));

router.put('/:id', handleAsyncFunction(taskController.updateTask));

router.delete('/:id', handleAsyncFunction(taskController.deleteTask));

module.exports = router;
