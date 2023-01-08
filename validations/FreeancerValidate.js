const { check, validationResult } = require("express-validator");
exports.ValidateLogin = [
  check("email")
    .isEmail()
    .withMessage("Invalid email")
    .notEmpty()
    .withMessage("email cannot be empty"),
  check("password")
    .isLength({ min: 5 })
    .notEmpty()
    .withMessage("password cannot be empty"),
];

exports.ValidateRegistration = [
  check("email")
    .isEmail()
    .withMessage("Invalid email")
    .notEmpty()
    .withMessage("email cannot be empty"),
  check("password")
    .isLength({ min: 5 })
    .notEmpty()
    .withMessage("password cannot be empty"),
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("name should have min length of 3 character"),
  check("phone")
    .isNumeric()
    .withMessage("write a valid number")
    .isLength({ min: 10, max: 10 })
    .withMessage("phone number should have 10 values"),
];

exports.ValidateApplication = [
  check("address")
    .isLength({ min: 5 })
    .withMessage("Address must be at least 5 characters long"),
  check("name")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  check("adhar")
    .isLength({ min: 12, max: 12 })
    .isNumeric()
    .withMessage("Aadhaar number must be a 12-digit numeric value"),
  check("email").isEmail().withMessage("Invalid email address"),
  check("Pincode")
    .isLength({ min: 6, max: 6 })
    .isNumeric()
    .withMessage("Pincode must be a 6-digit numeric value"),
  check("mobile1")
    .isLength({ min: 10, max: 10 })
    .isNumeric()
    .withMessage("Mobile number must be a 10-digit numeric value"),
  check("mobile2")
    .optional()
    .isLength({ min: 10, max: 10 })
    .isNumeric()
    .withMessage("Mobile number must be a 10-digit numeric value"),
  check("dob").notEmpty().withMessage("Invalid date of birth"),
  check("religion")
    .isLength({ min: 3 })
    .withMessage("Religion must be at least 3 characters long"),
  check("caste")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Caste must be at least 3 characters long"),
  check("education")
    .isLength({ min: 3 })
    .withMessage("Education must be at least 3 characters long"),
  check("experience")
    .isInt({ min: 0 })
    .withMessage("Experience must be a non-negative integer"),
  check("course")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Course must be at least 3 characters long"),
  check("subject")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Subject must be at least 3 characters long"),
  check("expecting_salary")
    .isInt({ min: 0 })
    .withMessage("Expected salary must be a non-negative integer"),
  check("hourly_salary")
    .isInt({ min: 0 })
    .withMessage("Hourly salary must be a non-negative integer"),
  check("apply")
    .isIn(["online", "offline"])
    .withMessage("Invalid application method"),
];
