const { LoginHandler, createUserHandler } = require('../controller/FreelancerController')

const router=require('express').Router()



router.post('/login',LoginHandler)
router.post('/register',createUserHandler)

module.exports=router