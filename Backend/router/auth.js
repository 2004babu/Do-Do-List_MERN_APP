const express=require('express')
const router=express.Router()
const { login, register,isAuthenticatedUser,updatePassword, forgotPassword, changePassword, loadUser, logoutUser, updateProfile } = require('../Controller/authController')
const multer=require('multer')
const path=require('path')

const upload=multer({
    storage:multer.diskStorage({
        destination:function (req,file,cd){
            cd(null,path.join(__dirname,'../uploads/user'))
        },
        filename:function(req,file,cd){
            cd(null,file.originalname)
        }
    })
})


router.route('/login').post(login)
                    .get(isAuthenticatedUser,loadUser)
router.route('/register').post(upload.single('avatar'),register)
router.route('/password/update').put(isAuthenticatedUser,updatePassword)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/change').post(isAuthenticatedUser,changePassword)
router.route('/logout').delete(isAuthenticatedUser,logoutUser)
router.route('/profile/update').post(upload.single('avatar'),isAuthenticatedUser,updateProfile)
module.exports=router
