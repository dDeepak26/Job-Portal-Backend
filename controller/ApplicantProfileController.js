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
module.exports = { createUpdateApplicantProfile, getApplicantProfile };
