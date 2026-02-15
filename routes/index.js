const express = require('express');
const router = express.Router();
const taskRoutes = require('./tasksRoute');
const authRoutes = require('./authRoute');

router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);

module.exports = router;
