const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { handleAsyncFunction } = require('../utils/commonHelper');

router.get('/', handleAsyncFunction(userController.getUsers));

router.get('/roles', handleAsyncFunction(userController.getUserRoles));

router.get('/:id', handleAsyncFunction(userController.getUser));

router.put('/id', handleAsyncFunction(userController.updateUser));

router.delete('/:id', handleAsyncFunction(userController.deleteUser));

module.exports = router;
