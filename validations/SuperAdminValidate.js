const { check, validationResult } = require("express-validator");
exports.ValidateSuperAdminLogin = [
    check("email").isEmail().withMessage("Invalid email").notEmpty()
    .withMessage("email cannot be empty"),
    check("password")
      .isLength({ min: 5 })
      .notEmpty()
      .withMessage("password cannot be empty"),
  ];


  exports.VaildateSubjects=[
     // Validate the "name" field
  check('subject').not().isEmpty().withMessage('Name is required'),

  // Validate the "subSubjects" field
  check('subSubjects').isArray().withMessage('Sub-subjects must be an array'),

  // Validate each sub-subject in the "subSubjects" array
  check('subSubjects.*.name').not().isEmpty().withMessage('Sub-subject name is required'),
  ]