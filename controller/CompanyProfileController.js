const { validationResult } = require("express-validator");
const { EmployerModel } = require("../model/EmployerModel");

// get company profile by employer id
const getCompanyProfile = async (req, res) => {
  try {
    // checking if user is employer || !
    const isEmployer = req.user;
    if (isEmployer.role !== "employer") {
      return res
        .status(401)
        .json({ errorMessage: "Only Employer can create company profile" });
    }
    console.log("employer data from middleware ", isEmployer);

    const companyProfileData = await EmployerModel.findById(isEmployer._id);
    if (
      !companyProfileData ||
      !companyProfileData.companyName ||
      !companyProfileData.companyAbout ||
      !companyProfileData.companyImage
    ) {
      return res.status(404).json({ errorMessage: "No company profile found" });
    }

    return res.status(200).json(companyProfileData);
  } catch (error) {
    console.error("Error in getting the company profile by id ", error);
    res
      .status(500)
      .json({ errorMessage: "Error in getting the company profile by id" });
  }
};

// create update company profile of employer
const updateCompanyProfile = async (req, res) => {
  try {
    // checking if user is employer || !
    const isEmployer = req.user;
    if (isEmployer.role !== "employer") {
      return res
        .status(401)
        .json({ errorMessage: "Only Employer can create company profile" });
    }
    console.log("employer data from middleware ", isEmployer);

    // validating the request body
    const { companyName, companyAbout } = req.body;
    console.log("Request body ", req.body);
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
    const imageUrl = `${baseUrl}/uploads/CompanyProfile/${req.file.filename}`;

    const updatedCompanyProfile = await EmployerModel.findByIdAndUpdate(
      isEmployer._id,
      {
        companyName: companyName,
        companyAbout: companyAbout,
        companyImage: imageUrl,
      },
      { new: true }
    );

    // const newCompanyProfileData = new
    res.status(200).json({
      message: "company profile updated successfully",
      updatedCompanyProfile: updatedCompanyProfile,
    });
  } catch (error) {
    console.error(
      "Error in updating the company profile by employer id ",
      error
    );
    res.status(500).json({
      errorMessage: "Error in updating the company profile by employer id",
    });
  }
};

module.exports = {
  getCompanyProfile,
  updateCompanyProfile,
};
