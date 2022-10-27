/* internal import */
const fs = require("fs");
const Course = require("../models/Course");

/* display all courses */
exports.displayAllCourses = async (query) => {
  const result = await Course.find(query);
  return result;
};

/* insert new course */
exports.insertNewCourse = async (data) => {
  const result = await Course.create(data);
  return result;
};

/* display specific course */
exports.displaySpecificCourse = async (id) => {
  const result = await Course.findById(id);
  return result;
};

/* remove specific course */
exports.removeSpecificCourse = async (id) => {
  const result = await Course.findByIdAndDelete(id);
  fs.unlinkSync(`${__dirname}/../public/uploads/${result.thumbnail}`);
  return result;
};
