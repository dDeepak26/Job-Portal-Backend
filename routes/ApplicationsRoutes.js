const express = require("express");
const router = express.Router();
const multerUploaderMiddleware = require("../middleware/multerUploaderMiddleware");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const {
  applyToJob,
  getAppliedJobData,
  getJobStatus,
  getApplicantsForJob,
  changeJobStatus,
} = require("../controller/ApplicationsController");

const uploadResume = multerUploaderMiddleware("Resumes", "resume");

// get applied jobs data
router.get("/", AuthMiddleware, getAppliedJobData);

// get applied job status
router.get("/status/:id", AuthMiddleware, getJobStatus);

// get all applicant for a specific job
router.get("/applicants/:id", AuthMiddleware, getApplicantsForJob);

// change job status
router.put("/status/update/:id", AuthMiddleware, changeJobStatus);

// apply to job only by applicant
router.post(
  "/:id",
  uploadResume.single("resumeUrl"),
  AuthMiddleware,
  applyToJob
);

module.exports = router;
