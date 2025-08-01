const express = require("express");
const cors = require("cors");
const path = require("path");
const MongoDbConnect = require("./config/MongoDbConnect");
const UserRoutes = require("./routes/UserRoutes");
const CompanyProfileRoutes = require("./routes/CompanyProfileRoutes");
const ApplicantProfileRoutes = require("./routes/ApplicantProfileRoutes");
const JobRoutes = require("./routes/JobRoutes");

// env config
const dotenv = require("dotenv");
dotenv.config();

// express instance
const app = express();

// basic middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// connecting to mongodb
MongoDbConnect();

// basic test route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello" });
});

// all routes
app.use("/api/auth", UserRoutes);
app.use("/api/company-profile", CompanyProfileRoutes);
app.use("/api/applicant-profile", ApplicantProfileRoutes);
app.use("/api/job", JobRoutes);

// listening
app.listen(process.env.PORT || 8080, () => {
  console.log("Server started on port 8080");
});
