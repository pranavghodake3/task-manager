const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const { handleAsyncFunction } = require('../utils/commonHelper');

router.post('/login', authMiddleware.login, handleAsyncFunction(authController.login));

router.get(
  '/get-refresh-token',
  authMiddleware.isRefreshTokenAuthentic,
  handleAsyncFunction(authController.getRefreshToken),
);

router.post(
  '/register/super-admin',
  authMiddleware.register,
  handleAsyncFunction(authController.registerSuperAdmin),
);

router.post(
  '/register/company',
  authMiddleware.registerCompany,
  handleAsyncFunction(authController.registerCompany),
);

router.post(
  '/register/company/:companyId/project/:projectId/manager',
  authMiddleware.registerCompanyProjectManager,
  handleAsyncFunction(authController.registerCompanyProjectManager),
);

router.post(
  '/register/company/:companyId/project/:projectId/user',
  authMiddleware.registerCompanyProjectUser,
  handleAsyncFunction(authController.registerCompanyProjectUser),
);

module.exports = router;
