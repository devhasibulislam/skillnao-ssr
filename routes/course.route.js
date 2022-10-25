/* external import */
const express = require("express");

/* internal import */
const courseController = require("../controllers/course.controller");
const authorizedRoleMiddleware = require("../middlewares/authorizedRole.middleware");
const courseThumbnailMiddleware = require("../middlewares/courseThumbnail.middleware");
const verifyTokenMiddleware = require("../middlewares/verifyToken.middleware");

/* router level connection */
const router = express.Router();

router.post(
  "/thumbnail",
  courseThumbnailMiddleware.single("thumbnail"),
  courseController.uploadCourseThumbnail
);

router
  .route("/")
  .get(courseController.displayAllCourses)
  .post(
    verifyTokenMiddleware,
    authorizedRoleMiddleware("admin"),
    courseController.insertNewCourse
  );
router
  .route("/:id")
  .get(
    verifyTokenMiddleware,
    authorizedRoleMiddleware("admin", "user"),
    courseController.displaySpecificCourse
  )
  .delete(
    verifyTokenMiddleware,
    authorizedRoleMiddleware("admin"),
    courseController.removeSpecificCourse
  );

module.exports = router;
