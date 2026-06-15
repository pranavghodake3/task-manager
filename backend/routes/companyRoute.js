const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const { handleAsyncFunction } = require('../utils/commonHelper');

router.get('/:companyId/users', handleAsyncFunction(companyController.getUsers));

module.exports = router;
