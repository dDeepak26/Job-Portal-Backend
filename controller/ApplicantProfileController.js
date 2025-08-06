const { validationResult } = require("express-validator");
const { ApplicantModel } = require("../model/ApplicantModel");

// create applicant profile
const createUpdateApplicantProfile = async (req, res) => {
  try {
    const isApplicant = req.user;
    if (isApplicant.role !== "applicant") {
      return res
        .status(401)
        .json({ errorMessage: "Only Applicant can create its profile" });
    }

    // checking if applicant is present
    const applicantData = await ApplicantModel.findById(isApplicant._id);
    if (!applicantData) {
      return res
        .status(409)
        .json({ errorMessage: "Applicant not found register first" });
    }

    // getting the data from request body
    const { aAbout, aQualifications, aExperience, aLocation, aSkills, aImage } =
      req.body;

    // validation request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errorMessage: errors
          .array()
          .map((err) => ({ field: err.param, message: err.msg })),
      });
    }

    // file validation
    console.log("file info ", req.file);
    if (!req.file) {
      return res.status(400).json({ errorMessage: "No file uploaded" });
    }

    // image file path config
    const baseUrl = req.protocol + "://" + req.get("host"); // e.g., http://localhost:8080
    const imageUrl = `${baseUrl}/uploads/ApplicantProfile/${req.file.filename}`;

    const updatedApplicantData = await ApplicantModel.findByIdAndUpdate(
      isApplicant._id,
      {
        aAbout: aAbout,
        aQualifications: aQualifications,
        aExperience: aExperience,
        aSkills: aSkills,
        aLocation: aLocation,
        aImage: imageUrl,
      },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Created/Updated successfully", updatedApplicantData });
  } catch (error) {
    console.error("Error in creating / updating applicant profile ", error);
    res
      .status(500)
      .json({ errorMessage: "Error in creating / updating applicant profile" });
  }
};

const getApplicantProfile = async (req, res) => {
  try {
    const isApplicant = req.user;
    if (isApplicant.role !== "applicant") {
      return res
        .status(401)
        .json({ message: "only applicant can get their profile" });
    }

    const profileData = await ApplicantModel.findById(isApplicant._id);
    if (
      !profileData ||
      !profileData.aAbout ||
      !profileData.aQualifications ||
      !profileData.aExperience ||
      !profileData.aLocation ||
      !profileData.aSkills ||
      !profileData.aImage
    ) {
      return res.status(409).json({ message: "No profile found" });
    }

    if (profileData) {
      res.status(200).json(profileData);
    }
  } catch (error) {
    console.error("Error in getting applicant profile", error);
    res.status(500).json({ message: "Error in getting applicant profile" });
  }
};

// to save the user resume
const saveResume = async (req, res) => {
  try {
    // checking if user is employer
    const applicant = req.user;
    if (applicant.role !== "applicant") {
      return res
        .status(401)
        .json({ errorMessage: "only applicant can save their resume" });
    }

    // checking if file is present
    if (!req.file) {
      return res.status(400).json({ errorMessage: "no resume file uploaded" });
    }
    console.log("req.file data", req.file);

    // pdf file path config
    const baseUrl = req.protocol + "://" + req.get("host"); // e.g., http://localhost:8080
    const resumeUrl = `${baseUrl}/uploads/Resumes/${req.file.filename}`;

    await ApplicantModel.findByIdAndUpdate(
      { _id: applicant._id },
      {
        resumeUrl: resumeUrl,
      }
    );
    res.status(200).json({ message: "resume saved" });
  } catch (error) {
    console.log("error in saving the applicant resume", error);
    res
      .status(500)
      .json({ errorMessage: "Error in saving the applicant resume" });
  }
};

module.exports = {
  createUpdateApplicantProfile,
  getApplicantProfile,
  saveResume,
};
