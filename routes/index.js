const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/auth");

const taskRoutes = require("./task");
const authRoutes = require("./auth");


router.use("/tasks", isLoggedIn, taskRoutes)
router.use("/auth", authRoutes)

module.exports = router;
