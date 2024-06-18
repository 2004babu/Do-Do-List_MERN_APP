const express=require('express')
const router=express.Router()
const { login, register,isAuthenticatedUser,updatePassword, forgotPassword, changePassword, loadUser, logoutUser } = require('../Controller/authController')

router.route('/login').post(login)
                    .get(isAuthenticatedUser,loadUser)
router.route('/register').post(register)
router.route('/password/update').put(isAuthenticatedUser,updatePassword)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/change').post(isAuthenticatedUser,changePassword)
router.route('/logout').delete(isAuthenticatedUser,logoutUser)
module.exports=router
