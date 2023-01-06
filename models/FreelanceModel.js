const mongoose = require("mongoose");
const bcrypt=require('bcrypt')

const FreelancerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type:String
  },
  phone: {
    type:Number
  },
  password: {
    type:String
  }
});
// pre                                                                                                                                                                         
FreelancerSchema.pre('save', function(next) {                                                                                                                                        
    if(this.password) {                                                                                                                                                        
        let salt = bcrypt.genSaltSync(10)                                                                                                                                     
        this.password  = bcrypt.hashSync(this.password, salt)                                                                                                                
    }                                                                                                                                                                          
    next()                                                                                                                                                                     
})            

FreelancerSchema.methods.comparePassword = async function (
    passwordInput
  ) {

      return bcrypt.compare(passwordInput,this.password).catch((e)=>false)
  };

const Data = mongoose.model("Freelancer", FreelancerSchema);

module.exports = Data;