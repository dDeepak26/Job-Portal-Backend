const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employers",
      required: true,
    },
    jRole: {
      type: String,
      trim: true,
      required: true,
    },
    jMode: {
      type: String,
      trim: true,
      required: true,
    },
    jSalary: {
      type: Number,
      trim: true,
      required: true,
    },
    jLocation: {
      type: String,
      trim: true,
      required: true,
    },
    jExperience: {
      type: Number,
      trim: true,
      required: true,
    },
    jQualification: {
      type: String,
      trim: true,
      required: true,
    },
    jSkills: {
      type: String,
      trim: true,
      required: true,
    },
    jResponsibility: {
      type: String,
      trim: true,
      required: true,
    },
    jNoOpening: {
      type: Number,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = {
  JobModel: mongoose.model("jobs", jobSchema),
};
