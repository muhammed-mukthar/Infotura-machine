const mongoose = require("mongoose");


const JobSchema = new mongoose.Schema({
  region: {
    type: String,
    required: true,
  },
course:{
    type:String,
},
  faculty: {
    type: String,
  },
  subject: {
    type: String,
  },
  lesson:{
type:String
  },
  startTime: {
    type: Date,
  },
  endTime: {
    type: Date,
  },time:{
    type:String
  }
});

const Data = mongoose.model("Job", JobSchema);

module.exports = Data;
