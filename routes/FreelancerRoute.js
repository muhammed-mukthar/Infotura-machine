const { LoginHandler } = require('../controller/FreelancerController')

const router=require('express').Router()



router.post('/login',LoginHandler)

module.exports=router