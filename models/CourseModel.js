const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    course: {
    type: String,
    required: true,
  }
});


const Data = mongoose.model("Course", CourseSchema);

module.exports = Data;
