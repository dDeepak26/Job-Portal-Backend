const mongoose = require("mongoose");

const EmployerUserSchema = new mongoose.Schema(
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
      default: "employer",
      immutable: true,
    },
    companyName: {
      type: String,
      trim: true,
    },
    companyAbout: {
      type: String,
      trim: true,
    },
    companyImage: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = {
  EmployerModel: mongoose.model("employers", EmployerUserSchema),
};
