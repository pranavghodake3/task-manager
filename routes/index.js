const express = require('express');
const router = express.Router();
const taskRoutes = require('./tasksRoute');
const authRoutes = require('./authRoute');
const authMiddleware = require('../middlewares/authMiddleware');

router.use('/auth', authRoutes);
router.use('/tasks', authMiddleware.isAuthentic, taskRoutes);

module.exports = router;
