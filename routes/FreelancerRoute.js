const {
  LoginHandler,
  createUserHandler,
} = require("../controller/FreelancerController");
const { VerifyToken } = require("../middleware/middleware");
const ApplicationModel = require("../models/applicationModel");

const router = require("express").Router();

router.post("/login", LoginHandler);
router.post("/register", createUserHandler);
router.post("/application",VerifyToken, async (req, res) => {
  try {
    const application = await ApplicationModel.create(req.body);
    res.json(application);
  } catch (err) {
    res.status(409).json({ err: err.message });
  }
});
module.exports = router;
