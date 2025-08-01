const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { ApplicantModel } = require("../model/ApplicantModel");
const { EmployerModel } = require("../model/EmployerModel");

// to create a new user or register
const registerUser = async (req, res) => {
  try {
    console.log("register api called with initials values ", req.body);
    const { fullName, email, password, role } = req.body;

    // validating req body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errorMessage: errors
          .array()
          .map((err) => ({ field: err.param, message: err.msg })),
      });
    }

    if (role === "applicant") {
      // checking if user already exist
      const user = await ApplicantModel.findOne({ email });
      if (user) {
        return res
          .status(409)
          .json({ errorMessage: "Applicant User already exists" });
      }

      // hashing the user password
      const hashedPassword = await bcrypt.hash(password, 10);

      // creating new user object
      const newUser = new ApplicantModel({
        fullName,
        email,
        password: hashedPassword,
        role,
      });

      // saving/creating the user in db
      await newUser.save();
      return res
        .status(200)
        .json({ message: "User Register Successfully", newUser });
    }
    if (role === "employer") {
      // checking if user already exist
      const user = await EmployerModel.findOne({ email });
      if (user) {
        return res
          .status(409)
          .json({ errorMessage: "Employer User already exists" });
      }

      // hashing the user password
      const hashedPassword = await bcrypt.hash(password, 10);

      // creating new user object
      const newUser = new EmployerModel({
        fullName,
        email,
        password: hashedPassword,
        role,
      });

      // saving/creating the user in db
      await newUser.save();
      return res
        .status(200)
        .json({ message: "Employer User Register Successfully", newUser });
    }
  } catch (error) {
    console.log("Error in creating user (catch) ", error);
    res.status(500).json({ errorMessage: "Error in creating user (catch)" });
  }
};

// applicant user
const loginApplicantUser = async (req, res) => {
  try {
    console.log(
      "Applicant Login api called with the initial values ",
      req.body
    );
    const { email, password } = req.body;

    // validating the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errorMessage: errors
          .array()
          .map((err) => ({ field: err.param, message: err.msg })),
      });
    }

    // checking if user is register or not
    const user = await ApplicantModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ errorMessage: "Applicant User is not Register" });
    }
    console.log("User Data in db ", user);

    // verifying user password
    const matchedPassword = await bcrypt.compare(password, user.password);
    console.log("matched password ", matchedPassword);

    if (!matchedPassword) {
      return res.status(401).json({ errorMessage: "Password not Matched" });
    }

    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    // generating token
    const token = await jwt.sign(
      {
        _id: user._id,
        fullName: user.fullName,
        email,
        role: user.role,
      },
      JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );

    res
      .status(201)
      .json({ message: "Applicant User Logged Successfully ", token, user });
  } catch (error) {
    console.error("Error in logging the user (catch) ", error);
    res.status(500).json({ errorMessage: "Error in logging the user (catch)" });
  }
};

// employer login
const loginEmployerUser = async (req, res) => {
  try {
    console.log("Employer Login api called with the initial values ", req.body);
    const { email, password } = req.body;

    // validating the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errorMessage: errors
          .array()
          .map((err) => ({ field: err.param, message: err.msg })),
      });
    }

    // checking if user is register or not
    const user = await EmployerModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ errorMessage: "Employer User is not Register" });
    }
    console.log("User Data in db ", user);

    // verifying user password
    const matchedPassword = await bcrypt.compare(password, user.password);
    console.log("matched password ", matchedPassword);

    if (!matchedPassword) {
      return res.status(401).json({ errorMessage: "Password not Matched" });
    }

    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    // generating token
    const token = await jwt.sign(
      {
        _id: user._id,
        fullName: user.fullName,
        email,
        role: user.role,
      },
      JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );

    res
      .status(201)
      .json({ message: "Employer User Logged Successfully ", token, user });
  } catch (error) {
    console.error("Error in logging the user (catch) ", error);
    res.status(500).json({ errorMessage: "Error in logging the user (catch)" });
  }
};

module.exports = { registerUser, loginApplicantUser, loginEmployerUser };
