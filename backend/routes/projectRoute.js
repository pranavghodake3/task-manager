const express = require('express');
const router = express.Router({ mergeParams: true });
const projectMiddleware = require('../middlewares/projectMiddleware');
const projectController = require('../controllers/projectController');
const { handleAsyncFunction } = require('../utils/commonHelper');

router.get(
  '/',
  // projectMiddleware.isCompanyProjectValid,
  handleAsyncFunction(projectController.getProjects),
);

router.get(
  '/:id',
  projectMiddleware.isCompanyProjectValid,
  handleAsyncFunction(projectController.getProjectById),
);

router.post(
  '/',
  projectMiddleware.isCompanyProjectValid,
  handleAsyncFunction(projectController.createProject),
);

router.put(
  '/',
  projectMiddleware.isCompanyProjectValid,
  handleAsyncFunction(projectController.updateProject),
);

router.delete(
  '/:id',
  projectMiddleware.isCompanyProjectValid,
  handleAsyncFunction(projectController.deleteProject),
);

module.exports = router;
