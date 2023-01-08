const {
  LoginHandler,
  createUserHandler,
  applicationHandler,
  AllotTimeSlot,
} = require("../controller/FreelancerController");
const { VerifyToken } = require("../middleware/middleware");

const {
  ValidateLogin,
  ValidateRegistration,
  ValidateApplication,
} = require("../validations/FreeancerValidate");
const router = require("express").Router();

router.post("/login", ValidateLogin, LoginHandler);
router.post("/register", ValidateRegistration, createUserHandler);
router.post("/application",ValidateApplication,VerifyToken,applicationHandler);
router.post('/allotslot',VerifyToken,AllotTimeSlot)
module.exports = router;
