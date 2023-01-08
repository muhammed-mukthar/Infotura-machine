const mongoose = require("mongoose");

const SubjectsSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  subSubjects: {
    type: Array,
  },
});


const Data = mongoose.model("Subject", SubjectsSchema);

module.exports = Data;
