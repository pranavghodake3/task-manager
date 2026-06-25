const express = require('express');
const router = express.Router({ mergeParams: true });
const companyController = require('../controllers/companyController');
const { handleAsyncFunction } = require('../utils/commonHelper');
const projectRoutes = require('./projectRoute');
const { hasAccess } = require('../middlewares/authMiddleware');
const { ENTITIES, ACTION_TYPES } = require('../constants');

router.get('/:companyId/users', hasAccess(ENTITIES.USER, ACTION_TYPES.READ), handleAsyncFunction(companyController.getUsers));

router.post('/:companyId/users', hasAccess(ENTITIES.USER, ACTION_TYPES.CREATE), handleAsyncFunction(companyController.addUsers));

router.put('/:companyId/users/:userId', hasAccess(ENTITIES.USER, ACTION_TYPES.UPDATE), handleAsyncFunction(companyController.updateUsers));

router.use('/:companyId/projects', projectRoutes);

module.exports = router;
