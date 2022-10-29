/**
 * Title: Initial segment of this project
 * Description: All application level tasks execute here
 * Author: Hasibul Islam
 * Date: 23/10/2022
 */

/* external imports */
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

/* internal imports */
const errorHandlerMiddleware = require("./middlewares/errorHandler.middleware");

/* router level imports */
const userRoute = require("./routes/user.route");
const courseRoute = require("./routes/course.route");

/* application level connections */
const app = express();

/* middlewares connections */
app.use(
  fileUpload({
    useTempFiles: true,
    safeFileNames: /jpg|jpeg|png/i,
    preserveExtension: 3 || 4,
    limits: {
      fieldSize: 1024,
    },
  })
);
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

/* router level connections */
app.use("/user", userRoute);
app.use("/course", courseRoute);

/* global error handlers */
app.use(errorHandlerMiddleware);

/* enable connection */
app.get("/", (req, res) => {
  try {
    res.status(200).json({
      acknowledgement: true,
      message: "Establishing server connection complete",
      description:
        "The request is processing well & returning success message E-Commerce project",
    });
  } catch (error) {
    res.status(204).json({
      acknowledgement: false,
      message: error.name,
      description: error.message,
    });
  }
});

/* export application */
module.exports = app;
