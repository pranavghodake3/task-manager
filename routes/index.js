const express = require("express");
const router = express.Router();
const taskRoutes = require('./tasksRoute')

router.use('/tasks', taskRoutes);

module.exports = router;
