const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/TaskController")

router.get("/", TaskController.index);
router.get("/create", TaskController.create);
router.post("/", TaskController.store);
router.get("/:id", TaskController.show);
router.get("/:id/edit", TaskController.edit);
router.post("/:id", TaskController.update);
router.delete("/:id", TaskController.destroy);

module.exports = router;
