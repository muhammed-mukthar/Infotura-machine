const FreelancerModel = require("../models/FreelancerModel");
exports.LoginHandler= async (req, res) => {
    try {
      console.log(req.body);
      const user = await FreelancerModel.findOne({ email: req.body.email });
      if (!user) {
       return res.json({ err: "user not found" });
      }
      const isValid = await user.comparePassword(req.body.password);
      console.log(isValid);
      if (!isValid) {
          return  res.json({ err: "invalid password" });
      }
      const userDetails = {
        _id: user._id,
        email: user.email,
      };
    
      console.log(accessToken);
      res.json({ data: userDetails });
    } catch (error) {
      res.status(500).json({ err: error });
    }
  }