const express = require('express');
const router = express.Router();
const taskRoutes = require('./tasksRoute');
const authRoutes = require('./authRoute');
const userRoutes = require('./userRoute');
const companyRoutes = require('./companyRoute');
const projectRoutes = require('./projectRoute');
const authMiddleware = require('../middlewares/authMiddleware');

router.use('/auth', authRoutes);
router.use('/tasks', authMiddleware.isAuthentic, taskRoutes);
router.use('/company', authMiddleware.isAuthentic, companyRoutes);
router.use('/projects', authMiddleware.isAuthentic, projectRoutes);
router.use('/users', userRoutes);

module.exports = router;
