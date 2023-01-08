const mongoose = require("mongoose");

const AllotTimeUserSchema = new mongoose.Schema({
  course: {
    type: String,
  },
  UserId: {
    type: String,
  },
  subject: {
    type: String,
  },
  availabletimefrom: {
    type: Date,
  },
  availabletimeto: {
    type: Date,
  },
  booked: {
    type: Boolean,
    default: false,
  },
  time:{
    type:String
  }
});

const Data = mongoose.model("AllotTime", AllotTimeUserSchema);

module.exports = Data;
