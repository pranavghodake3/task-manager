const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController');
const { handleAsyncFunction } = require('../utils/commonHelper');

router.get('/', handleAsyncFunction(statusController.getStatuses));

router.get('/:id', handleAsyncFunction(statusController.getStatus));

router.put('/:id', handleAsyncFunction(statusController.updateStatus));

module.exports = router;
