const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middleware/AuthMiddleware");
const {
  createJob,
  updateJob,
  getAllJobs,
  getJobsDetailsById,
  getJobOfEmployer,
  applyToJobByApplicant,
} = require("../controller/JobController");
const jobValidator = require("../utils/jobValidator");

// create job only by employer only if company profile is created
router.post("/", jobValidator, AuthMiddleware, createJob);

// update job only by employer only if company profile is created and job is created
router.put("/:id", jobValidator, AuthMiddleware, updateJob);

// get all jobs both applicant & employer
router.get("/", getAllJobs);

// get job details by id both applicant & employer
router.get("/:id", getJobsDetailsById);

// get all jobs posted by employer
router.get("/employer/jobs", AuthMiddleware, getJobOfEmployer);

// apply to job only applicant
router.put("/apply/:id", AuthMiddleware, applyToJobByApplicant);

module.exports = router;
