const express = require("express");
const router = express.Router();
const multerUploaderMiddleware = require("../middleware/multerUploaderMiddleware");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const {
  applyToJob,
  getAppliedJobData,
} = require("../controller/ApplicationsController");

const uploadResume = multerUploaderMiddleware("Resumes", "resume");

// get applied jobs data
router.get("/", AuthMiddleware, getAppliedJobData);

// apply to job only by applicant
router.post(
  "/:id",
  uploadResume.single("resumeUrl"),
  AuthMiddleware,
  applyToJob
);

module.exports = router;
