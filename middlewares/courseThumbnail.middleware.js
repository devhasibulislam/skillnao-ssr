/**
 * Title: Upload product thumbnail
 * Description: Create a middleware based on thumbnail upload for each product
 * Author: Hasibul Islam
 * Date: 24/10/2022
 */

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

module.exports = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const supportedImage = /PNG|png|JPEG|jpeg|JPG|jpg|WEBP|webp|svg|SVG/;
    const extension = path.extname(file.originalname);

    if (supportedImage.test(extension)) {
      cb(null, true);
    } else {
      cb(new Error("Must be a png/jpg/jpeg/webp formate"));
    }
  },
  limits: {
    fileSize: 1000000, // >= 1mb
  },
});
