/* external import */
const express = require("express");

/* internal import */
const userController = require("../controllers/user.controller");

/* router level connection */
const router = express.Router();

router.get("/me", userController.getMe);
router.get("/all", userController.displayAllUsers);
router.post("/signup", userController.signUpNewUser);
router.post("/signin", userController.signInExistingUser);

module.exports = router;
