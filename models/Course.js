/* external import */
const mongoose = require("mongoose");

const packageSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please, provide a course title"],
      unique: [true, "Title already exists"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please, provide a course category"],
      enum: {
        values: ["academic", "professional", "job-related"],
        message:
          "{VALUE} is not a valid category, try academic/professional/job-related",
      },
      trim: true,
    },
    about: {
      type: String,
      required: [true, "Please, provide a short description for your course"],
      trim: true,
    },
    thumbnail: {
      type: String,
      default:
        "https://www.open.edu/openlearn/pluginfile.php/3277384/tool_ocwmanage/articletext/0/become_a_student_inline.jpg",
    },
    description: {
      reason: {
        type: String,
        required: [true, "Please, provide course description"],
        trim: true,
      },
      purpose: {
        type: String,
        required: [true, "Please, provide course description"],
        trim: true,
      },
    },
    price: {
      type: Number,
      required: [true, "Please, provide the course price"],
    },
    status: {
      type: String,
      enum: {
        values: ["active", "inactive"],
        message: "{VALUE} is not a valid status, try active/inactive",
      },
      default: "active",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Course = new mongoose.model("Course", packageSchema);
module.exports = Course;
