const { validationResult } = require("express-validator");
const { EmployerModel } = require("../model/EmployerModel");
const { JobModel } = require("../model/JobModel");
const { ApplicantModel } = require("../model/ApplicantModel");

// create job only by employer only if company profile is created
const createJob = async (req, res) => {
  try {
    // checking if user is employer || !
    const isEmployer = req.user;
    if (isEmployer.role !== "employer") {
      return res
        .status(401)
        .json({ errorMessage: "Only Employer can create job" });
    }
    console.log("employer data from middleware during create ", isEmployer);

    // checking if employer has created the company profile || !
    const companyProfileData = await EmployerModel.findById(isEmployer._id);
    if (
      !companyProfileData ||
      !companyProfileData.companyName ||
      !companyProfileData.companyAbout ||
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
    if (isEmployer.role !== "employer") {
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
    const jobsData = await JobModel.find().populate(
      "employerId",
      "companyName companyImage"
    );
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
    const jobsData = await JobModel.findById(id).populate(
      "employerId",
      "companyName companyAbout companyImage"
    );
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
    if (isEmployer.role !== "employer") {
      return res
        .status(401)
        .json({ errorMessage: "Only employer can get its posted job data" });
    }
    console.log("employer data", isEmployer);

    const empJobData = await JobModel.find({
      employerId: isEmployer._id,
    }).populate("employerId");
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

// save and unsave job api
const saveJob = async (req, res) => {
  try {
    // verifying the applicant
    const applicant = req.user;
    if (applicant.role !== "applicant") {
      return res
        .status(401)
        .json({ errorMessage: "only applicant can save the job" });
    }

    // verifying if job is is passed
    const jobId = req.params.id;
    if (!jobId) {
      return res
        .status(404)
        .json({ errorMessage: "Job Id is required in params" });
    }

    // if job id is present then removing it else adding it
    const isSaved = await ApplicantModel.findOne({
      _id: applicant._id,
      savedJobs: jobId,
    });
    console.log("saved document", isSaved);

    if (isSaved) {
      // removing the saved
      const removeSavedJobs = await ApplicantModel.findByIdAndUpdate(
        applicant._id,
        {
          $pull: { savedJobs: jobId },
        },
        { new: true }
      );
      res.status(201).json({ message: "saved", removeSavedJobs });
    } else {
      // saving the job
      const userSavedJobs = await ApplicantModel.findByIdAndUpdate(
        applicant._id,
        {
          $push: { savedJobs: jobId },
        },
        { new: true }
      );
      res.status(201).json({ message: "saved", userSavedJobs });
    }
  } catch (error) {
    console.error("Error in saving jobs", error);
    res.status(500).json({ errorMessage: "Error in saving jobs" });
  }
};

// get list saved jobs ids
const getSavedJobs = async (req, res) => {
  try {
    // verifying the applicant
    const applicant = req.user;
    if (applicant.role !== "applicant") {
      return res
        .status(401)
        .json({ errorMessage: "only applicant can save the job" });
    }

    const savedJobsList = await ApplicantModel.findById(applicant._id)
      .select("savedJobs")
      .populate({
        path: "savedJobs",
        populate: {
          path: "employerId",
          model: "employers",
        },
      });

    res.status(200).json(savedJobsList);
  } catch (error) {
    console.error("Error in getting saving jobs", error);
    res.status(500).json({ errorMessage: "Error in getting saving jobs" });
  }
};

module.exports = {
  createJob,
  updateJob,
  getAllJobs,
  getJobsDetailsById,
  getJobOfEmployer,
  saveJob,
  getSavedJobs,
};
