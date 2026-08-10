const express = require('express');
const router = express.Router({ mergeParams: true });
// const projectMiddleware = require('../middlewares/projectMiddleware');
const projectController = require('../controllers/projectController');
const { handleAsyncFunction } = require('../utils/commonHelper');
const { hasAccess } = require('../middlewares/authMiddleware');
const { ENTITIES, ACTION_TYPES } = require('../constants');

router.get(
  '/',
  hasAccess(ENTITIES.PROJECT, ACTION_TYPES.READ),
  // projectMiddleware.isCompanyProjectValid,
  handleAsyncFunction(projectController.getProjects),
);

router.get(
  '/:id',
  hasAccess(ENTITIES.PROJECT, ACTION_TYPES.READ),
  // projectMiddleware.isCompanyProjectValid,
  handleAsyncFunction(projectController.getProjectById),
);

router.post(
  '/:id/add-member',
  hasAccess(ENTITIES.PROJECT, ACTION_TYPES.UPDATE),
  // projectMiddleware.isCompanyProjectValid,
  handleAsyncFunction(projectController.addMemberToProject),
);

router.delete(
  '/:id/users/:userId/remove',
  hasAccess(ENTITIES.PROJECT, ACTION_TYPES.UPDATE),
  // projectMiddleware.isCompanyProjectValid,
  handleAsyncFunction(projectController.removeMemberFromProject),
);

router.post(
  '/',
  hasAccess(ENTITIES.PROJECT, ACTION_TYPES.CREATE),
  // projectMiddleware.isCompanyProjectValid,
  handleAsyncFunction(projectController.createProject),
);

router.put(
  '/:id',
  hasAccess(ENTITIES.PROJECT, ACTION_TYPES.UPDATE),
  // projectMiddleware.isCompanyProjectValid,
  handleAsyncFunction(projectController.updateProject),
);

router.delete(
  '/:id',
  hasAccess(ENTITIES.PROJECT, ACTION_TYPES.DELETE),
  // projectMiddleware.isCompanyProjectValid,
  handleAsyncFunction(projectController.deleteProject),
);

module.exports = router;
