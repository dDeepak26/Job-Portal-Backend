const express = require("express");
const router = express.Router();
const multerUploaderMiddleware = require("../middleware/multerUploaderMiddleware");
const ApplicantProfileValidator = require("../utils/ApplicantProfileValidator");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const {
  createUpdateApplicantProfile,
  getApplicantProfile,
} = require("../controller/ApplicantProfileController");

const uploadApplicantProfile = multerUploaderMiddleware("ApplicantProfile");

// get profile info
router.get("/", AuthMiddleware, getApplicantProfile);

// create | update applicant profile
router.put(
  "/",
  uploadApplicantProfile.single("aImage"),
  ApplicantProfileValidator,
  AuthMiddleware,
  createUpdateApplicantProfile
);

module.exports = router;
