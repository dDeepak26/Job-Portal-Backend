const { body } = require("express-validator");

// Regex patterns
const onlyLettersRegex = /^[A-Za-z\s]+$/;
const skillsRegex = /^[A-Za-z0-9,\-\s]+$/; // Letters, numbers, commas, dashes, spaces
const textBlockRegex = /^[A-Za-z0-9\s.,'-]+$/; // For descriptions like responsibility

const jobValidator = [
  body("jRole")
    .trim()
    .notEmpty()
    .withMessage("Job role is required")
    .matches(onlyLettersRegex)
    .withMessage("Job role must contain only letters and spaces")
    .isLength({ min: 2, max: 50 }),

  body("jMode")
    .trim()
    .notEmpty()
    .withMessage("Job mode is required")
    .matches(onlyLettersRegex)
    .withMessage("Job mode must contain only letters and spaces")
    .isLength({ min: 2, max: 30 }),

  body("jSalary")
    .notEmpty()
    .withMessage("Salary is required")
    .isFloat({ min: 1.0, max: 100.0 })
    .withMessage("Salary must be between 1,000 and 10000"),

  body("jLocation")
    .trim()
    .notEmpty()
    .withMessage("Location is required")
    .matches(onlyLettersRegex)
    .withMessage("Location must contain only letters and spaces")
    .isLength({ min: 2, max: 100 }),

  body("jExperience")
    .notEmpty()
    .withMessage("Experience is required")
    .isFloat({ min: 0.0, max: 50.0 })
    .withMessage("Experience must be between 0 and 50 years"),

  body("jQualification")
    .trim()
    .notEmpty()
    .withMessage("Qualification is required")
    .matches(onlyLettersRegex)
    .withMessage("Qualification must contain only letters and spaces")
    .isLength({ min: 2, max: 100 }),

  body("jSkills")
    .trim()
    .notEmpty()
    .withMessage("Skills are required")
    .matches(skillsRegex)
    .withMessage(
      "Skills must be comma-separated words (letters, numbers, dashes)"
    )
    .isLength({ min: 2, max: 200 }),

  body("jResponsibility")
    .trim()
    .notEmpty()
    .withMessage("Responsibility is required")
    .matches(textBlockRegex)
    .withMessage("Responsibility can contain letters, numbers, punctuation")
    .isLength({ min: 10, max: 500 }),

  body("jNoOpening")
    .notEmpty()
    .withMessage("Number of openings is required")
    .isInt({ min: 1, max: 1000 })
    .withMessage("Openings must be between 1 and 1000"),
];

module.exports = jobValidator;
