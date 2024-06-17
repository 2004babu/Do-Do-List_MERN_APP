const express=require('express')
const router=express.Router()

const {isAuthenticatedUser}=require('../Controller/authController')
const { createDoDo, updateDoDo, deleteDoDo, getSingleDoDo, getAllDoDo } = require('../Controller/Do-Do_Controller')

router.route('/dodo')
                    .post(isAuthenticatedUser,createDoDo)
                    .put(isAuthenticatedUser,updateDoDo)
                    .delete(isAuthenticatedUser,deleteDoDo)
router.route('/dodo/:id')
                    .get(isAuthenticatedUser,getSingleDoDo)
                    
router.route('/getalldodo')
                    .get(isAuthenticatedUser,getAllDoDo)


module.exports=router
