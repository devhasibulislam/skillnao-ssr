/**
 * Title: Initial segment of this project
 * Description: All application level tasks execute here
 * Author: Hasibul Islam
 * Date: 23/10/2022
 */

/* external imports */
const express = require("express");
const cors = require("cors");

/* internal imports */
const errorHandlerMiddleware = require("./middlewares/errorHandler.middleware");

/* router level imports */
const userRoute = require("./routes/user.route");
const courseRoute = require("./routes/course.route");

/* application level connections */
const app = express();

/* middlewares connections */
app.use(cors({
  origin: "https://skillnao-ssr.onrender.com/"
}));
app.use(express.json());
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
