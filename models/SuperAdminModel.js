const mongoose = require("mongoose");
const bcrypt=require('bcrypt')

const SuperAdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type:String
  }
});
// pre                                                                                                                                                                         
SuperAdminSchema.pre('save', function(next) {                                                                                                                                        
    if(this.password) {                                                                                                                                                        
        let salt = bcrypt.genSaltSync(10)                                                                                                                                     
        this.password  = bcrypt.hashSync(this.password, salt)                                                                                                                
    }                                                                                                                                                                          
    next()                                                                                                                                                                     
})            

SuperAdminSchema.methods.comparePassword = async function (
    passwordInput
  ) {

      return bcrypt.compare(passwordInput,this.password).catch((e)=>false)
  };

const Data = mongoose.model("SuperAdmin", SuperAdminSchema);

module.exports = Data;