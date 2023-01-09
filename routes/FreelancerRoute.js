const {
  LoginHandler,
  createUserHandler,
  applicationHandler,
  AllotTimeSlot,
  GetJobsAlloted,
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
router.get('/allotslot',VerifyToken,GetJobsAlloted)
module.exports = router;
