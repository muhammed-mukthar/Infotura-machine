const SuperAdminModel = require("../models/SuperAdminModel");
const { check, validationResult } = require('express-validator');
const { generateAccessToken } = require("../utils/jwt");
exports.SuperAdminLoginHandler = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    console.log(req.body);
   
    const user = await SuperAdminModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ err: "user not found" });
    }
    const isValid = await user.comparePassword(req.body.password);
    console.log(isValid);
    if (!isValid) {
      return res.status(403).json({ err: "invalid password" });
    }
    const userDetails = {
      _id: user._id,
      email: user.email,
      isadmin: true,
    };
    const accessToken = generateAccessToken(userDetails);
    res.json({ data: "admin login successfully", accessToken: accessToken });
  } catch (error) {
    res.status(500).json({ err: error });
  }
};
