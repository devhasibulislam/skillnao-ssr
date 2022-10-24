/* external import */
const express = require("express");

/* internal import */
const userController = require("../controllers/user.controller");
const authorizedRoleMiddleware = require("../middlewares/authorizedRole.middleware");
const verifyTokenMiddleware = require("../middlewares/verifyToken.middleware");

/* router level connection */
const router = express.Router();

router.get(
  "/all",
  verifyTokenMiddleware,
  authorizedRoleMiddleware("admin"),
  userController.displayAllUsers
);
router.post("/signup", userController.signUpNewUser);
router.post("/signin", userController.signInExistingUser);
router.get("/me", verifyTokenMiddleware, userController.getMe);
router
  .route("/:id", verifyTokenMiddleware, authorizedRoleMiddleware("admin"))
  .patch(userController.updateSpecificUser)
  .delete(userController.removeSpecificUser);

module.exports = router;
