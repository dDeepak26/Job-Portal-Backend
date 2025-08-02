const mongoose = require("mongoose");

const ApplicationsSchema = new mongoose.Schema(
  {
    applicantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "applicants",
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jobs",
      required: true,
    },
    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employers",
      required: true,
    },
    status: {
      type: String,
      enum: ["Applied", "Reviewing", "Interview", "Rejected", "Hired"],
      default: "Applied",
    },
    resumeUrl: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = {
  ApplicationsModel: mongoose.model("applications", ApplicationsSchema),
};
