const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const { handleAsyncFunction } = require('../utils/commonHelper');

router.post('/login', authMiddleware.login, handleAsyncFunction(authController.login));

// router.get('/logout', authMiddleware.isAuthentic, handleAsyncFunction(authController.logout));

router.get(
  '/refresh-access-token',
  authMiddleware.isRefreshTokenCookieAuthentic,
  handleAsyncFunction(authController.getRefreshAccessToken),
);

router.get(
  '/logout',
  authMiddleware.isRefreshTokenCookieAuthentic,
  handleAsyncFunction(authController.logout),
);

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

router.post('/register', authMiddleware.register, handleAsyncFunction(authController.registerUser));

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
