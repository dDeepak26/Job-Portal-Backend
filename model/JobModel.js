const mongoose = require("mongoose");
const { ApplicantUserSchema } = require("./ApplicantModel");

const jobSchema = new mongoose.Schema(
  {
    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      require: true,
    },
    companyName: {
      type: String,
      trim: true,
      require: true,
    },
    companyAbout: {
      type: String,
      trim: true,
      require: true,
    },
    companyImage: {
      type: String,
      trim: true,
    },
    jRole: {
      type: String,
      trim: true,
      require: true,
    },
    jMode: {
      type: String,
      trim: true,
      require: true,
    },
    jSalary: {
      type: Number,
      trim: true,
      require: true,
    },
    jLocation: {
      type: String,
      trim: true,
      require: true,
    },
    jExperience: {
      type: Number,
      trim: true,
      require: true,
    },
    jQualification: {
      type: String,
      trim: true,
      require: true,
    },
    jSkills: {
      type: String,
      trim: true,
      require: true,
    },
    jResponsibility: {
      type: String,
      trim: true,
      require: true,
    },
    jNoOpening: {
      type: Number,
      trim: true,
      require: true,
    },
    appliedApplicants: [ApplicantUserSchema],
  },
  { timestamps: true }
);

module.exports = {
  JobModel: mongoose.model("jobs", jobSchema),
};
