const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { handleAsyncFunction } = require('../utils/commonHelper');

router.get('', handleAsyncFunction(userController.getUsers));

module.exports = router;
