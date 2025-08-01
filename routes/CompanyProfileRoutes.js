const express = require("express");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const {
  getCompanyProfile,
  updateCompanyProfile,
} = require("../controller/CompanyProfileController");
const companyProfileValidator = require("../utils/CompanyProfileValidator");
const multerUploaderMiddleware = require("../middleware/multerUploaderMiddleware");
const router = express.Router();

const uploadCompanyProfile = multerUploaderMiddleware("CompanyProfile");

// get company profile by employer id
router.get("/", AuthMiddleware, getCompanyProfile);

// update company profile route only by employer
router.put(
  "/",
  uploadCompanyProfile.single("companyImage"),
  companyProfileValidator,
  AuthMiddleware,
  updateCompanyProfile
);

module.exports = router;
