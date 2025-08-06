const express = require("express");
const router = express.Router();
const multerUploaderMiddleware = require("../middleware/multerUploaderMiddleware");
const ApplicantProfileValidator = require("../utils/ApplicantProfileValidator");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const {
  createUpdateApplicantProfile,
  getApplicantProfile,
  saveResume,
} = require("../controller/ApplicantProfileController");

const uploadApplicantProfile = multerUploaderMiddleware("ApplicantProfile");
const uploadApplicantResume = multerUploaderMiddleware("Resumes", "resume");

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

// resume update
router.put(
  "/resume",
  AuthMiddleware,
  uploadApplicantResume.single("file"),
  saveResume
);

module.exports = router;
