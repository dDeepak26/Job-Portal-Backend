const multer = require("multer");
const path = require("path");
const fs = require("fs");

const multerUploaderMiddleware = (
  folderName = "unknown",
  uploadType = "image"
) => {
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
      const uniqueName = `${Date.now()}-${file.originalname}`;
      cb(null, uniqueName);
    },
  });

  // file filter to only store the images
  const fileFilterImage = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const ext = path.extname(file.originalname).toLowerCase();
    const mime = file.mimetype;

    if (allowedTypes.test(ext) && allowedTypes.test(mime)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  };

  // file filter to store pdf
  const fileFilterPdf = (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx/;
    const allowedMimes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const ext = path.extname(file.originalname).toLowerCase();
    const mime = file.mimetype;

    if (allowedTypes.test(ext) && allowedMimes.includes(mime)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF and Word files are allowed"));
    }
  };

  return multer({
    storage,
    fileFilter: uploadType === "image" ? fileFilterImage : fileFilterPdf,
    limits: uploadType === "image" ? { fileSize: 5 * 1024 * 1024 } : undefined,
  });
};

module.exports = multerUploaderMiddleware;
