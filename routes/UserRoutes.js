const express = require("express");
const {
  registerUser,
  loginApplicantUser,
  loginEmployerUser,
} = require("../controller/UserController");
const {
  registerUserValidator,
  loginUserValidator,
} = require("../utils/userValidator");
const router = express.Router();

// register route
router.post("/register", registerUserValidator, registerUser);

// login route for applicant
router.post("/login/applicant", loginUserValidator, loginApplicantUser);

// login route for employer
router.post("/login/employer", loginUserValidator, loginEmployerUser);

module.exports = router;
