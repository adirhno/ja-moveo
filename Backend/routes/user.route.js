
const userController = require("../controllers/user.controller.js");
const router = require("express").Router()

router.post("/", userController.userSignUp);
router.post("/admin", userController.adminSignUp);
router.post("/login", userController.login);


module.exports = router;