const express=require('express')
const router=express.Router()
const { login, register,isAuthenticatedUser,updatePassword, forgotPassword, changePassword } = require('../Controller/authController')

router.route('/login').post(isAuthenticatedUser,login)
router.route('/register').post(isAuthenticatedUser,register)
router.route('/password/update').put(isAuthenticatedUser,updatePassword)
router.route('/password/forgot').post(isAuthenticatedUser,forgotPassword)
router.route('/password/change').post(isAuthenticatedUser,changePassword)

module.exports=router
