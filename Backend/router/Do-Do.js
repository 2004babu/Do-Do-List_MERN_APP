const express=require('express')
const router=express.Router()

const {isAuthenticatedUser, logoutUser}=require('../Controller/authController')
const { createDoDo, updateDoDo, deleteDoDo, getSingleDoDo, getAllDoDo, getLocalDoDo } = require('../Controller/Do-Do_Controller')

router.route('/dodo')
                    .post(isAuthenticatedUser,createDoDo)
                    .put(isAuthenticatedUser,updateDoDo)
router.route('/dodo/:id')
                    .delete(isAuthenticatedUser,deleteDoDo)
                    .get(isAuthenticatedUser,getSingleDoDo)
                    
router.route('/getalldodo')
                    .get(isAuthenticatedUser,getAllDoDo)
router.route('/sendlocaldodo')
                    .post(isAuthenticatedUser,getLocalDoDo)



module.exports=router
