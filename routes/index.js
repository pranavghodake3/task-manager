const express = require('express');
const router = express.Router();
const taskRoutes = require('./tasksRoute');
const projectRoute = require('./projectRoute');
const authRoutes = require('./authRoute');
const authMiddleware = require('../middlewares/authMiddleware');

router.use('/auth', authRoutes);
router.use('/tasks', authMiddleware.isAuthentic, taskRoutes);
router.use('/company/:companyId/projects', authMiddleware.isAuthentic, projectRoute);

module.exports = router;
