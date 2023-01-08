const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ApplicationModel = new mongoose.Schema({
  address: {
    type: String,
  },
  name: {
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
  religion: {
    type: String,
  },
  caste: {
    type: String,
  },
  education: {
    type: String,
  },
  experience: {
    type: String,
  },
  course: {
    type: String,
  },
  subject: {
    type: String,
  },
  expecting_salary: {
    type: Number,
  },
  hourly_salary: {
    type: Number,
  },
  apply: {
    type: String,
  },
  selected: {
    type: Boolean,
    default: true,
  },
});

const Data = mongoose.model("Application", ApplicationModel);

module.exports = Data;
