const FreelancerModel = require("../models/FreelancerModel");
const { generateAccessToken } = require("../utils/jwt");
const { check, validationResult } = require('express-validator')
const ApplicationModel = require("../models/applicationModel");
exports.LoginHandler = async (req, res) => {
  try {
    console.log(req.body);
    const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
 
    const user = await FreelancerModel.findOne({ email: req.body.email });
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
    };
    const accessToken = generateAccessToken(userDetails);
    res.json({ data: userDetails, accessToken: accessToken });
  } catch (error) {
    res.status(500).json({ err: error });
  }
};

exports.createUserHandler=async (req, res)=> {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
   

    let userexist = await FreelancerModel.findOne({
      $or: [{ email: req.body.email }, { phone: req.body.phone }],
    });

    if (userexist) {
      res.json({ err: "user already exist" });
    } else {
      const user = await FreelancerModel.create(req.body);

      res.json(user);
    }
  } catch (err) {
    res.status(409).json({ err: err.message });
  }
}


exports.applicationHandler=async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
   
    const application = await ApplicationModel.create(req.body);
    res.json(application);
  } catch (err) {
    res.status(409).json({ err: err.message });
  }
}