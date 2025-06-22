const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/taskController")
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    console.log("File obj: ",file)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1000)
    const extension = file.mimetype.split("/")[1];
    const fullFileName = file.fieldname + '-' + uniqueSuffix + "." + extension;
    console.log("fullFileName: ",fullFileName)
    cb(null, fullFileName)
  }
})

const upload = multer({ storage: storage })

router.get("/", TaskController.getAllTasks);
router.post("/", upload.single('file'), TaskController.createTask);
router.get("/:id", TaskController.getSingleTask);
router.put("/:id", TaskController.updateSingleTask);
router.delete("/:id", TaskController.deleteSingleTask);

module.exports = router;
