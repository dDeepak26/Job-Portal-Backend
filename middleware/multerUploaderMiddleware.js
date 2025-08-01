const multer = require("multer");
const path = require("path");
const fs = require("fs");

const multerUploaderMiddleware = (folderName = "uploads") => {
  // storage config
  const storage = multer.diskStorage({
    // file destination
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, "..", "uploads", folderName);
      fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    },
    // file name
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}--${file.originalname}`;
      cb(null, uniqueName);
    },
  });

  // file filter to only store the images
  const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const ext = path.extname(file.originalname).toLowerCase();
    const mime = file.mimetype;

    if (allowedTypes.test(ext) && allowedTypes.test(mime)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  };

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
  });
};

module.exports = multerUploaderMiddleware;
