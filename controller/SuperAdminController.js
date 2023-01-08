const SuperAdminModel = require("../models/SuperAdminModel");
const { check, validationResult } = require("express-validator");
const { generateAccessToken } = require("../utils/jwt");
const SubjectModel = require("../models/SubjectModel");
const CourseModel = require("../models/CourseModel");
const ApplicationModel = require("../models/applicationModel");
const FreelancerModel = require("../models/FreelancerModel");
const FacultyModel = require("../models/FacultyModel");
const JobModel=require('../models/JobModel')
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

exports.AddSubjectsAndSubsubjectsHandler = (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let subSubjects = req.body.subSubjects; // get sub-subjects from request body
    let subject = new SubjectModel({
      subject: req.body.subject,
      subSubjects: subSubjects,
    });

    subject.save((error) => {
      if (error) {
        res.status(400).send(error); // return error if validation fails
      } else {
        res.send("Subject saved successfully");
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getSubjectHandler = async (req, res) => {
  try {
    let allSubjectsAndSub = await SubjectModel.find();
    res.json({ data: allSubjectsAndSub });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.addCourseHandler = (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let newCourse = new CourseModel({
      course: req.body.course,
    });

    newCourse.save((error) => {
      if (error) {
        res.status(400).send(error); // return error if validation fails
      } else {
        res.send("Course saved successfully");
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getCourseHandler = async (req, res) => {
  try {
    const allCourse = await CourseModel.find();

    res.json({ data: allCourse });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.approveApplicationHandler = async (req, res) => {
  try {
    const { applicationId, UserId } = req.body;
    if (!applicationId) {
      return res.status(403).json({ err: " something went wrong" });
    }
    const application = await ApplicationModel.updateOne(
      { _id: applicationId },
      {
        $set: {
          selected: true,
        },
      }
    );
    if (!application) {
      res.status(403).json({ err: "error happened" });
    }
    const freelance = await FreelancerModel.updateOne(
      { _id: UserId },
      {
        $set: {
          selected: true,
        },
      }
    );
    if (!freelance) {
      res.status(403).json({ err: "error happened" });
    }
    res.json({ data: "application selected " });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.addFacultyHandler = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let newFaculty = new FacultyModel({
      email: req.body.email,
      name: req.body.name,
      phone: req.body.phone,
      password: req.body.password,
      place: req.body.place,
      phone: req.body.phone,
    });

    newFaculty.save((error) => {
      if (error) {
        res.status(400).send(error); // return error if validation fails
      } else {
        res.send("Course saved successfully");
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.addJobHandler = async (req, res) => {
  try {
  
    const startTime = new Date( req.body.startTime);
    const endTime = new Date( req.body.endTime);

    const duration = endTime.getTime() - startTime.getTime();

    const days = Math.floor(duration / 86400000); // 1 day = 86400000 milliseconds
    const hours = Math.floor((duration % 86400000) / 3600000); // 1 hour = 3600000 milliseconds
    const minutes = Math.floor((duration % 3600000) / 60000); // 1 minute = 60000 milliseconds

    let timeString = `${days} days, ${hours} hours, ${minutes} minutes`; // "0 days, 0
    let newJob = new JobModel({
      region: req.body.region,

      course: req.body.course,
      faculty: req.body.faculty,
      subject: req.body.subject,
      lesson: req.body.lesson,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      time: timeString,
    });

    newJob.save((error) => {
      if (error) {
        res.status(400).send(error); // return error if validation fails
      } else {
        res.send("Course saved successfully");
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
