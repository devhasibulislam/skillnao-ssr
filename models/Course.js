/* external import */
const mongoose = require("mongoose");

const packageSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please, provide a course title"],
      unique: [true, "Title already exists"],
      trim: true,
      minLength: [10, "Short description won't be less than 200 characters"],
      maxLength: [100, "Short description won't be more than 300 characters"],
    },
    category: {
      type: String,
      required: [true, "Please, provide a course category"],
      trim: true,
      lowercase: true,
      maxLength: [50, "Category name won't be more than 50 characters"],
    },
    about: {
      type: String,
      required: [true, "Please, provide a short description for your course"],
      trim: true,
      minLength: [50, "Short description won't be less than 50 characters"],
      maxLength: [500, "Short description won't be more than 500 characters"],
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
        minLength: [100, "Short description won't be less than 100 characters"],
        maxLength: [
          1000,
          "Short description won't be more than 1000 characters",
        ],
      },
      purpose: {
        type: String,
        required: [true, "Please, provide course description"],
        trim: true,
        minLength: [100, "Short description won't be less than 100 characters"],
        maxLength: [
          1000,
          "Short description won't be more than 1000 characters",
        ],
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
