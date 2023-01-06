const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ApplicationModel = new mongoose.Schema({
  address: {
    type: String,
  },
  ame: {
    type: String,
  },
  adhar: {
    type: String,
  },
  email: {
    type: String,
  },
  Pincode: {
    type: Number,
  },
  mobile1: {
    type: Number,
  },
  mobile2: {
    type: Number,
  },
  dob: {
    type: String,
  },
  relegion: {
    type: String,
  },
  caste: {
    type: String,
  },
  education: {
    type: String,
  },
  exprience: {
    type: String,
  },
  course: {
    type: String,
  },
  subject: {
    type: String,
  },
  expecting_salary: {
    type: String,
  },
  hourly_salary: {
    type: String,
  },
  apply: {
    type: String,
  },
  password: {
    type: String,
  },
});

const Data = mongoose.model("Application", ApplicationModel);

module.exports = Data;
