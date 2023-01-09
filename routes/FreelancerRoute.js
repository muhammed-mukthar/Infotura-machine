const {
  LoginHandler,
  createUserHandler,
  applicationHandler,
  AllotTimeSlot,
  GetJobsAlloted,
  ApplyJobsAlloted,
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
router.post('/apply',VerifyToken,ApplyJobsAlloted)
module.exports = router;
