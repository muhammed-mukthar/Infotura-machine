
const { SuperAdminLoginHandler } = require("../controller/SuperAdminController");
  const { VerifyToken } = require("../middleware/middleware");
const { ValidateSuperAdminLogin } = require("../validations/SuperAdminValidate");
  
  const router = require("express").Router();
  
  router.post("/login", ValidateSuperAdminLogin,SuperAdminLoginHandler);

  module.exports = router;
  