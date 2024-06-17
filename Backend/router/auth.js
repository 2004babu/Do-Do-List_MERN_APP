const express=require('express')
const router=express.Router()
const { login, register,isAuthenticatedUser,updatePassword, forgotPassword, changePassword } = require('../Controller/authController')

router.route('/login').post(login)
router.route('/register').post(register)
router.route('/password/update').put(isAuthenticatedUser,updatePassword)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/change').post(isAuthenticatedUser,changePassword)

module.exports=router
