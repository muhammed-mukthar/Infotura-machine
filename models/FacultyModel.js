const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const FacultySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  phone: {
    type: Number,
  },
  password: {
    type: String,
  },
  place: {
    type: String,
  },
  phone:{
    type:Number,
  }
});
FacultySchema.pre("save", function (next) {
    if (this.password) {
      let salt = bcrypt.genSaltSync(10);
      this.password = bcrypt.hashSync(this.password, salt);
    }
    next();
  });
const Data = mongoose.model("Faculty", FacultySchema);

module.exports = Data;
