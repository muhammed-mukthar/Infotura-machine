const {
  SuperAdminLoginHandler,
  AddSubjectsAndSubsubjects,
  AddSubjectsAndSubsubjectsHandler,
  getSubjectHandler,
  getCourseHandler,
  addCourseHandler,
  approveApplicationHandler,
} = require("../controller/SuperAdminController");
const { VerifyToken, VerifyTokenAdmin } = require("../middleware/middleware");
const {
  ValidateSuperAdminLogin,
  VaildateSubjects,
  VaildateCourse,
} = require("../validations/SuperAdminValidate");
const SubjectModel = require("../models/SubjectModel");
const router = require("express").Router();

router.post("/login", ValidateSuperAdminLogin, SuperAdminLoginHandler);
router.post(
  "/subjects",
  VerifyTokenAdmin,
  VaildateSubjects,
  AddSubjectsAndSubsubjectsHandler
);
router.get("/subjects", VerifyTokenAdmin, getSubjectHandler);
router.post("/course", VerifyTokenAdmin, VaildateCourse, addCourseHandler);
router.get("/course", VerifyTokenAdmin, getCourseHandler);
router.put("/appliction", VerifyTokenAdmin,approveApplicationHandler);
module.exports = router;
