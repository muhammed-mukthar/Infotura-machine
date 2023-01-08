const {
    LoginHandler,
    createUserHandler,
  } = require("../controller/FreelancerController");
  const { VerifyToken } = require("../middleware/middleware");
  const ApplicationModel = require("../models/applicationModel");
  
  const router = require("express").Router();
  
  router.post("/login", LoginHandler);

  module.exports = router;
  