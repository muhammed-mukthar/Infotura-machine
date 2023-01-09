const mongoose = require("mongoose");

const JobApplicationSchema = new mongoose.Schema({
  JobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
  UserId: { type: mongoose.Schema.Types.ObjectId, ref: "Freelancer" },
  status: {
    type: String,
    default: "Pending",
  },
  isBooked: {
    type: String,
    default: false,
  },
});

const Data = mongoose.model("JobApplication", JobApplicationSchema);

module.exports = Data;
