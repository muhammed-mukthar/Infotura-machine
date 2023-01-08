const { check, validationResult } = require("express-validator");
exports.ValidateSuperAdminLogin = [
    check("email").isEmail().withMessage("Invalid email").notEmpty()
    .withMessage("email cannot be empty"),
    check("password")
      .isLength({ min: 5 })
      .notEmpty()
      .withMessage("password cannot be empty"),
  ];
