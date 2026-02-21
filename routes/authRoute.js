const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/login', authMiddleware.login, authController.login);

router.get(
  '/get-refresh-token',
  authMiddleware.isRefreshTokenAuthentic,
  authController.getRefreshToken,
);

router.post('/register/super-admin', authMiddleware.register, authController.registerSuperAdmin);

router.post('/register/company', authMiddleware.registerCompany, authController.registerCompany);

router.post(
  '/register/company/:companyId/user',
  authMiddleware.registerCompanyUser,
  authController.registerCompanyUser,
);

module.exports = router;
