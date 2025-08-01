const mongoose = require("mongoose");

const ApplicantUserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      require: true,
    },
    password: {
      type: String,
      trim: true,
      require: true,
    },
    role: {
      type: String,
      trim: true,
      default: "applicant",
      immutable: true,
    },
    aImage: {
      type: String,
      trim: true,
    },
    aAbout: {
      type: String,
      trim: true,
    },
    aQualifications: {
      type: String,
      trim: true,
    },
    aExperience: {
      type: String,
      trim: true,
    },
    aLocation: {
      type: String,
      trim: true,
    },
    aSkills: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = {
  ApplicantModel: mongoose.model("applicants", ApplicantUserSchema),
  ApplicantUserSchema,
};
