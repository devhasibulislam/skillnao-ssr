/* external import */
const express = require("express");
const cloudinary = require("cloudinary").v2;

/* internal import */
const courseController = require("../controllers/course.controller");
const authorizedRoleMiddleware = require("../middlewares/authorizedRole.middleware");
// const courseThumbnailMiddleware = require("../middlewares/courseThumbnail.middleware");
const verifyTokenMiddleware = require("../middlewares/verifyToken.middleware");

/* cloudinary config */
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

/* router level connection */
const router = express.Router();

router.post(
  "/thumbnail",
  // courseThumbnailMiddleware.single("thumbnail"), // middleware for Multer
  // courseController.uploadCourseThumbnail // controller for Multer
  async (req, res, next) => {
    try {
      const file = req.files.thumbnail;
      cloudinary.uploader.upload(
        file.tempFilePath,
        {
          folder: "courses",
        },
        (error, result) => {
          if (!error) {
            res.status(201).json({
              acknowledgement: true,
              message: "Created",
              description: "Avatar successfully uploaded",
              data: result,
            });
          } else {
            next(error);
          }
        }
      );
    } catch (error) {
      next(error);
    }
  }
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
  .get(courseController.displaySpecificCourse)
  .patch(
    verifyTokenMiddleware,
    authorizedRoleMiddleware("admin"),
    courseController.updateSpecificCourse
  )
  .delete(
    verifyTokenMiddleware,
    authorizedRoleMiddleware("admin"),
    courseController.removeSpecificCourse
  );

module.exports = router;
