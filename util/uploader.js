const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const uploader = (destination) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destination);
    },
    filename: function (req, file, cb) {
      const filename = crypto
        .createHash("SHA256")
        .update(file.originalname)
        .digest("hex");
      const extention = path.extname(file.filename);
      cb(null, filename + extention);
    },
  });

  return multer({ storage });
};

module.exports = uploader;
