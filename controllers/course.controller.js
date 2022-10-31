/* internal import */
const courseService = require("../services/course.service");

/* upload course thumbnail */
exports.uploadCourseThumbnail = async (req, res, next) => {
  try {
    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "Avatar successfully uploaded",
      data: req.file,
    });
  } catch (error) {
    next(error);
  }
};

/* display all courses */
exports.displayAllCourses = async (req, res, next) => {
  try {
    const result = await courseService.displayAllCourses(req.query);

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "Fetching courses from DB",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* insert new course */
exports.insertNewCourse = async (req, res, next) => {
  try {
    const result = await courseService.insertNewCourse(req.body);

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "New course inserted to DB",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* display specific course */
exports.displaySpecificCourse = async (req, res, next) => {
  try {
    const result = await courseService.displaySpecificCourse(req.params.id);

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "Fetching specific course from DB",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* update specific course */
exports.updateSpecificCourse = async (req, res, next) => {
  try {
    const result = await courseService.updateSpecificCourse(
      req.params.id,
      req.body
    );

    res.status(202).json({
      acknowledgement: true,
      message: "Accepted",
      description: "Update specific course from DB",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* remove specific course */
exports.removeSpecificCourse = async (req, res, next) => {
  try {
    const result = await courseService.removeSpecificCourse(req.params.id);

    res.status(202).json({
      acknowledgement: true,
      message: "Accepted",
      description: "Remove specific course from DB",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
