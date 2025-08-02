const { ApplicationsModel } = require("../model/ApplicationsModel");
const { JobModel } = require("../model/JobModel");

// apply to only by applicant
const applyToJob = async (req, res) => {
  try {
    // checking if user is applicant
    const applicant = req.user;
    if (!applicant.role === "applicant") {
      return res
        .status(401)
        .json({ errorMessage: "only applicant can apply to job" });
    }

    // checking if id is passed
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(404).json({ errorMessage: "Job id is required" });
    }

    // checking if job is present in db
    const jobData = await JobModel.findById(jobId);
    if (!jobData) {
      return res.status(404).json({ errorMessage: "no job found" });
    }

    // checking if user already applied
    const applicantsData = await ApplicationsModel.findOne({
      applicantId: applicant._id,
      jobId: jobId,
    });
    console.log(applicantsData);
    if (applicantsData) {
      return res.status(409).json({ errorMessage: "Already applied to job" });
    }

    // file validation
    console.log("resume file info ", req.file);
    if (!req.file) {
      return res.status(400).json({ errorMessage: "no resume file uploaded" });
    }

    // pdf file path config
    const baseUrl = req.protocol + "://" + req.get("host"); // e.g., http://localhost:8080
    const resumeUrl = `${baseUrl}/uploads/resume/${req.file.filename}`;

    // creating new document
    const applicantDoc = new ApplicationsModel({
      applicantId: applicant._id,
      jobId: jobData._id,
      employerId: jobData.employerId,
      status: "Applied",
      resumeUrl: resumeUrl,
    });

    // saving
    const applicationData = await applicantDoc.save();

    res.status(201).json(applicationData);
  } catch (error) {
    console.error("Error in applying to job", error);
    res.status(500).json({ errorMessage: "Error in applying to job" });
  }
};

// get job status
// const getJobStatus = async (req, res) => {
//     try {
//         // checking if user is applicant
//     const applicant = req.user;
//     if (!applicant.role === "applicant") {
//       return res
//         .status(401)
//         .json({ errorMessage: "only applicant can apply to job" });
//     }

//     // checking if id is passed
//     const jobId = req.params.id;
//     if (!jobId) {
//       return res.status(404).json({ errorMessage: "Job id is required" });
//     }

//     // checking if job is present in db
//     const jobData = await JobModel.findById(jobId);
//     if (!jobData) {
//       return res.status(404).json({ errorMessage: "no job found" });
//     }

//     // checking if user already applied
//     const applicantsData = await ApplicationsModel.findOne({
//       applicantId: applicant._id,
//       jobId: jobId,
//     });
//     } catch (error) {
//         console.error("Error in getting job status", error);
//         res.status(500).json({errorMessage: "Error in getting job status"});
//     }
// }

// get applied jobs data
const getAppliedJobData = async (req, res) => {
  try {
    // checking if user is applicant
    const applicant = req.user;
    if (!applicant.role === "applicant") {
      return res
        .status(401)
        .json({ errorMessage: "only applicant can apply to job" });
    }
    console.log(applicant);

    // getting applicants applied jobs
    const appliedJobs = await ApplicationsModel.find({
      applicantId: applicant._id,
    })
      .populate("jobId")
      .populate("employerId");
    if (!appliedJobs) {
      return res.status(409).json({ errorMessage: "no applied jobs found" });
    }

    res.status(200).json(appliedJobs);
  } catch (error) {
    console.error("Error in getting applied jobs data", error);
    res.status(500).json({ errorMessage: "Error in getting jobs data" });
  }
};

module.exports = { applyToJob, getAppliedJobData };
