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

router.post('/register', authMiddleware.register, authController.register);

module.exports = router;
