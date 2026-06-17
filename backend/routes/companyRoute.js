const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const { handleAsyncFunction } = require('../utils/commonHelper');
const projectRoutes = require('./projectRoute');

router.get('/:companyId/users', handleAsyncFunction(companyController.getUsers));

router.post('/:companyId/users', handleAsyncFunction(companyController.addUsers));

router.use('/:companyId/projects', projectRoutes);

module.exports = router;
