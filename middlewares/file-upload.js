const multer = require("multer");
const path = require("path");
const storageEngine = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "upload");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

exports.upload = multer({
  storage: storageEngine,
  fileFilter: (req, file, callback) => {
    req.file = file;
    callback(null, true);
  },
});
