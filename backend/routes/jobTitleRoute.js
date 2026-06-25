const express = require('express');
const router = express.Router();
const jobTitleController = require('../controllers/jobTitleController');
const { handleAsyncFunction } = require('../utils/commonHelper');

router.get('/', handleAsyncFunction(jobTitleController.getJobTitles));

router.get('/:id', handleAsyncFunction(jobTitleController.getJobTitle));

router.put('/:id', handleAsyncFunction(jobTitleController.updateJobTitle));

module.exports = router;
