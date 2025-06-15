const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController")

router.post("/login", AuthController.login);
router.get("/signup", AuthController.signup);
router.get("/refresh-token", AuthController.refreshToken);

module.exports = router;
