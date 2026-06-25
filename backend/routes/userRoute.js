const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { handleAsyncFunction } = require('../utils/commonHelper');
const { hasAccess } = require('../middlewares/authMiddleware');
const { ENTITIES, ACTION_TYPES } = require('../constants');

router.get('/', hasAccess(ENTITIES.USER, ACTION_TYPES.READ), handleAsyncFunction(userController.getUsers));

router.get('/roles', handleAsyncFunction(userController.getUserRoles));

router.get('/:id', handleAsyncFunction(userController.getUser));

router.put('/id', handleAsyncFunction(userController.updateUser));

router.delete('/:id', handleAsyncFunction(userController.deleteUser));

module.exports = router;
