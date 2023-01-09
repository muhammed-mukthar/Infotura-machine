const FreelancerModel = require("../models/FreelancerModel");
const { generateAccessToken } = require("../utils/jwt");
const { check, validationResult } = require("express-validator");
const ApplicationModel = require("../models/applicationModel");
const AllotTimeModel = require("../models/AllotTime");
const JobModel = require("../models/JobModel");
const ApplyJob = require("../models/ApplyJob");
exports.LoginHandler = async (req, res) => {
  try {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
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

exports.createUserHandler = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
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
};

exports.applicationHandler = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const userId = req.user._id;
    console.log(userId);
    const applicationData = {
      userId: userId,
      ...req.body,
    };
    console.log(applicationData);
    const application = await ApplicationModel.create(applicationData);
    res.json(application);
  } catch (err) {
    res.status(409).json({ err: err.message });
  }
};

exports.AllotTimeSlot = (req, res) => {
  try {
    const startTime = new Date(req.body.availabletimefrom);
    const endTime = new Date(req.body.availabletimeto);

    const duration = endTime.getTime() - startTime.getTime();

    const days = Math.floor(duration / 86400000); // 1 day = 86400000 milliseconds
    const hours = Math.floor((duration % 86400000) / 3600000); // 1 hour = 3600000 milliseconds
    const minutes = Math.floor((duration % 3600000) / 60000); // 1 minute = 60000 milliseconds

    let timeString = `${days} days, ${hours} hours, ${minutes} minutes`; // "0 days, 0
    console.log(timeString);
    let newTimeSlot = new AllotTimeModel({
      course: req.body?.course,

      subject: req.body?.subject,

      availabletimefrom: req.body?.availabletimefrom,
      availabletimeto: req.body?.availabletimeto,
      UserId: req?.user?._id,
      time: timeString,
    });

    newTimeSlot.save((error) => {
      if (error) {
        res.status(400).send(error); // return error if validation fails
      } else {
        res.json({data:"Course saved successfully"});
      }
    });
  } catch (err) {
    res.status(409).json({ err: err.message });
  }
};

//get all slots provided by admin where the user is qualified

exports.GetJobsAlloted = async (req, res) => {
  try {
    const userTime = await AllotTimeModel.findOne({ UserId: req.user?._id });
    console.log(userTime);
    const allotedJobs = await JobModel.find({
      course: userTime.course,
      $and: [
        { startTime: { $gte: userTime.availabletimefrom } },
        { endTime: { $lte: userTime.availabletimeto } },
        { course: userTime.course },
        { subject: userTime.subject },
      ],
    });
    console.log(allotedJobs);
    res.json(allotedJobs);
  } catch (err) {
    res.status(409).json({ err: err.message });
  }
};

exports.ApplyJobsAlloted = async (req, res) => {
  try {
    const job = await JobModel.findOne({ _id: req.body?.jobId });
    console.log(job);
    if (job.booked) {
      res.json({ data: "the slot has been booked by another user " });
    }

    let Apply = new ApplyJob({
      JobId: req.body?.JobId,

      UserId: req.user?._id,

      status: "Applied",
    });

    Apply.save((error) => {
      if (error) {
        res.status(400).send(error); // return error if validation fails
      } else {
        res.json({data:"Application saved successfully"});
      }
    });
    res.json({data:"application applied suuccessfully"});
  } catch (err) {
    res.status(409).json({ err: err.message });
  }
};
