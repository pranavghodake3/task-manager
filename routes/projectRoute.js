const express = require('express');
const router = express.Router();
const projectMiddleware = require('../middlewares/projectMiddleware');
const projectController = require('../controllers/projectController');

router.get('/', projectMiddleware.isCompanyProjectValid, projectController.getProjects);

router.get('/:id', projectMiddleware.isCompanyProjectValid, projectController.getProjectById);

router.post('/', projectMiddleware.isCompanyProjectValid, projectController.createProject);

router.put('/', projectMiddleware.isCompanyProjectValid, projectController.updateProject);

router.delete('/:id', projectMiddleware.isCompanyProjectValid, projectController.deleteProject);

module.exports = router;
