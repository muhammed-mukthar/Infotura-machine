const SuperAdminModel = require("../models/SuperAdminModel");
const { check, validationResult } = require("express-validator");
const { generateAccessToken } = require("../utils/jwt");
const SubjectModel = require("../models/SubjectModel");
const CourseModel=require('../models/CourseModel')
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



exports.addCourseHandler=(req,res)=>{
    try{
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

    }catch(err){
        res.status(500).json(err)
    }
}

exports.getCourseHandler=async(req,res)=>{
    try{
       const allCourse=await CourseModel.find()

       res.json({data:allCourse})


    }catch(err){
        res.status(500).json(err)
    }

}

