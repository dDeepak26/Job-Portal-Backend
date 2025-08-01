const { validationResult } = require("express-validator");
const { EmployerModel } = require("../model/EmployerModel");
const { JobModel } = require("../model/JobModel");
const { ApplicantModel } = require("../model/ApplicantModel");

// create job only by employer only if company profile is created
const createJob = async (req, res) => {
  try {
    // checking if user is employer || !
    const isEmployer = req.user;
    if (!isEmployer.role === "employer") {
      return res
        .status(401)
        .json({ errorMessage: "Only Employer can create job" });
    }
    console.log("employer data from middleware during create ", isEmployer);

    // checking if employer has created the company profile || !
    const companyProfileData = await EmployerModel.findById(isEmployer._id);
    if (
      !companyProfileData.companyName &&
      !companyProfileData.companyAbout &&
      !companyProfileData.companyImage
    ) {
      return res
        .status(409)
        .json({ errorMessage: "Company Profile not found create it first" });
    }
    console.log(
      "company profile from db on crete api controller ",
      companyProfileData
    );

    // validating req body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errorMessage: errors
          .array()
          .map((err) => ({ field: err.param, message: err.msg })),
      });
    }

    // create new job object
    const newJobObj = new JobModel({
      ...req.body,
      employerId: isEmployer._id,
      companyName: companyProfileData.companyName,
      companyAbout: companyProfileData.companyAbout,
      companyImage: companyProfileData.companyImage,
    });

    const jobData = await newJobObj.save();

    res.status(200).json({ message: "job created successfully", jobData });
  } catch (error) {
    console.error("Error in creating job (catch) server ", error);
    res
      .status(500)
      .json({ errorMessage: "Error in creating job (catch) server" });
  }
};

// update job only by employer only if company profile is created and job is created
const updateJob = async (req, res) => {
  try {
    // checking if user is employer
    const isEmployer = req.user;
    if (!isEmployer === "employer") {
      return res
        .status(401)
        .json({ errorMessage: "Only Employer can update job details" });
    }

    // checking if params is received
    const jobId = req.params.id;
    if (!jobId) {
      return res
        .status(404)
        .json({ errorMessage: "job id is required in params" });
    }

    // checking if job is present in db
    const jobDetailsDb = await JobModel.findById({ _id: jobId });
    if (!jobDetailsDb) {
      return res.status(404).json({ errorMessage: "No job found in db" });
    }

    // validating the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errorMessage: errors
          .array()
          .map((err) => ({ field: err.param, message: err.msg })),
      });
    }

    const updatedJobDetailsRes = await JobModel.findByIdAndUpdate(
      jobDetailsDb._id,
      {
        ...req.body,
        employerId: isEmployer._id,
        companyName: jobDetailsDb.companyName,
        companyAbout: jobDetailsDb.companyAbout,
        companyImage: jobDetailsDb.companyImage,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Job details updated successfully",
      updatedJobDetailsRes,
    });
  } catch (error) {
    console.error("Error in updating the job (catch) server ", error);
    res
      .status(500)
      .json({ errorMessage: "Error in updating the job (catch) server" });
  }
};

// get all jobs both applicant & employer
const getAllJobs = async (req, res) => {
  try {
    const jobsData = await JobModel.find();
    if (!jobsData) {
      return res.status(404).json({ errorMessage: "No jobs found" });
    }

    res.status(200).json(jobsData);
  } catch (error) {
    console.error("Error in Getting the jobs ", error);
    res.status(500).json({ errorMessage: "Error in Getting Jobs" });
  }
};

// get job details by id both applicant & employer
const getJobsDetailsById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res
        .status(404)
        .json({ errorMessage: "Job Id is required in params" });
    }
    const jobsData = await JobModel.findById(id);
    if (!jobsData) {
      return res.status(404).json({ errorMessage: "No jobs found" });
    }

    res.status(200).json(jobsData);
  } catch (error) {
    console.error("Error in Getting the jobs ", error);
    res.status(500).json({ errorMessage: "Error in Getting Jobs" });
  }
};

// get all jobs posted by employer
const getJobOfEmployer = async (req, res) => {
  try {
    // checking is employer
    const isEmployer = req.user;
    if (!isEmployer.role === "employer") {
      return res
        .status(401)
        .json({ errorMessage: "Only employer can get its posted job data" });
    }
    console.log("employer data", isEmployer);

    const empJobData = await JobModel.find({ employerId: isEmployer._id });
    if (!empJobData) {
      return res
        .status(404)
        .json({ errorMessage: "no jobs found for the employer" });
    }
    res.status(200).json(empJobData);
  } catch (error) {
    console.error("Error in getting the jobs of employer", error);
    res
      .status(500)
      .json({ errorMessage: "Error in getting the jobs of employer" });
  }
};

// applicant apply to job
const applyToJobByApplicant = async (req, res) => {
  try {
    // checking applicant
    const isApplicant = req.user;
    if (!isApplicant === "applicant") {
      return res
        .status(401)
        .json({ errorMessage: "only applicant can apply to job" });
    }

    // checking if job is send
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(404).json({ errorMessage: "Job id is required" });
    }

    // getting user details
    const user = await ApplicantModel.findById(isApplicant._id);

    // posting user detail to job
    const updatedJobData = await JobModel.findByIdAndUpdate(
      jobId,
      {
        appliedApplicants: user,
      },
      { new: true }
    );

    res.status(200).json(updatedJobData);
  } catch (error) {
    console.error("Error in applying to job ", error);
    res.status().json({ errorMessage: "Error in applying to job" });
  }
};

module.exports = {
  createJob,
  updateJob,
  getAllJobs,
  getJobsDetailsById,
  getJobOfEmployer,
  applyToJobByApplicant,
};
