const { body } = require("express-validator");

const ApplicantProfileValidator = [
  body("aAbout")
    .optional()
    .isString()
    .withMessage("aAbout must be a string")
    .trim(),

  body("aQualifications")
    .optional()
    .isString()
    .withMessage("aQualifications must be a string")
    .trim(),

  body("aExperience")
    .optional()
    .isString()
    .withMessage("aExperience must be a string")
    .trim(),

  body("aLocation")
    .optional()
    .isString()
    .withMessage("aLocation must be a string")
    .trim(),

  body("aSkills")
    .optional()
    .isString()
    .withMessage("aSkills must be a string")
    .trim(),
];

module.exports = ApplicantProfileValidator;
