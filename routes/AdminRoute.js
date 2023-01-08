const {
  SuperAdminLoginHandler, AddSubjectsAndSubsubjects, AddSubjectsAndSubsubjectsHandler, getSubjectHandler,
} = require("../controller/SuperAdminController");
const { VerifyToken, VerifyTokenAdmin } = require("../middleware/middleware");
const {
  ValidateSuperAdminLogin,
  VaildateSubjects,
} = require("../validations/SuperAdminValidate");
const SubjectModel = require("../models/SubjectModel");
const router = require("express").Router();

router.post("/login", ValidateSuperAdminLogin, SuperAdminLoginHandler);
router.post("/addsubject",VerifyTokenAdmin, VaildateSubjects, AddSubjectsAndSubsubjectsHandler);
router.get('/subjects',VerifyTokenAdmin,getSubjectHandler)
module.exports = router;
