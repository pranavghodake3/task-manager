const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/taskController")

router.get("/", TaskController.getAllTasks);
router.post("/", TaskController.createTask);
router.get("/:id", TaskController.getSingleTask);
router.put("/:id", TaskController.updateSingleTask);
router.delete("/:id", TaskController.deleteSingleTask);

module.exports = router;
