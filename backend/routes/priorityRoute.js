const express = require('express');
const router = express.Router();
const priorityController = require('../controllers/priorityController');
const { handleAsyncFunction } = require('../utils/commonHelper');

router.get('/', handleAsyncFunction(priorityController.getPriorities));

router.get('/:id', handleAsyncFunction(priorityController.getPriority));

router.put('/id', handleAsyncFunction(priorityController.updatePriority));

module.exports = router;
