/* external import */
const express = require("express");

/* internal import */
const courseController = require("../controllers/course.controller");
const courseThumbnailMiddleware = require("../middlewares/courseThumbnail.middleware");

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
  .post(courseController.insertNewCourse);
router
  .route("/:id")
  .get(courseController.displaySpecificCourse)
  .delete(courseController.removeSpecificCourse);

module.exports = router;
