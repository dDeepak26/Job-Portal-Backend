const { body } = require("express-validator");

const companyProfileValidator = [
  body("companyName")
    .trim()
    .notEmpty()
    .withMessage("Company Name is required")
    .matches(/^[a-zA-Z0-9&.,\-() ]{2,100}$/)
    .withMessage(
      "Company name should start and end with letters, can only contains letter, number, & . , - ( ) space, minLength 2 maxLength 100"
    ),
  body("companyAbout")
    .trim()
    .notEmpty()
    .withMessage("Company about is required")
    .matches(/^[a-zA-Z0-9\s.,'"\-()&@!?]{10,1000}$/)
    .withMessage(
      "Company about start/end string, Allows letters, numbers, whitespace, and common punctuation, Minimum 10 characters, maximum 1000"
    ),
];

module.exports = companyProfileValidator;
