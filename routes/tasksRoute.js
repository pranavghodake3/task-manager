const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController")

router.get("/", taskController.testFirstFunction);

module.exports = router;
