const express = require('express');
const router = express.Router({ mergeParams: true });
const companyController = require('../controllers/companyController');
const { handleAsyncFunction } = require('../utils/commonHelper');
const projectRoutes = require('./projectRoute');

router.get('/:companyId/users', handleAsyncFunction(companyController.getUsers));

router.post('/:companyId/users', handleAsyncFunction(companyController.addUsers));

router.put('/:companyId/users/:userId', handleAsyncFunction(companyController.updateUsers));

router.use('/:companyId/projects', projectRoutes);

module.exports = router;
