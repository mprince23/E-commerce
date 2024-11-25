const express = require("express")
const userSignUpController = require("../controller/user/SignUp")
const userlogin = require("../controller/user/login")
const router = express.Router()


router.post('/singUp', userSignUpController)
router.post('/login', userlogin)



module.exports = router