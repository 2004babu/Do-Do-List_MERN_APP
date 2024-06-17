const catchAsyncError = require("../MiddleWare/catchAsyncError");
const User = require("../model/userModel");
const sendMail = require("../utils/email");
const setToken = require("../utils/jwt");
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const ErrorHandler=require('../utils/ErrorHandler')
const crypto = require("crypto");
const mongoose = require("mongoose");


// find a person who have already login ,,--vaerify them token and Find them Id 
exports.isAuthenticatedUser=catchAsyncError(async(req,res,next)=>{

  const {token}=req.cookies;
  
  if(!token){
   return next(new ErrorHandler('login first to handle this.!!'))
  }

  const {id}= await jwt.verify(token,process.env.JWT_SECRET)
  // console.log(id);


  const user=await User.findById(id)
  req.user=user
  console.log("isAuthenticateduser",user);
next()
})


// LOGIN -- server/login --post
exports.login = catchAsyncError(async (req, res, next) => {

  const {email,password}=req.body;
  if(!email||!password){
    return res.status(401).json({
      success: false,
      message: "fill the values ..!",
    });
  }

  const user=await User.findOne({email}).select('+password')
  if(!user){
    return res.status(401).json({
      success: false,
      message: "User Not Found",
    });
  }

const passwordisValid=await user.isValidPassword(password)

if (!passwordisValid) {
  return res.status(401).json({
    success: false,
    message: "Wrong Password..!",
  });
}

setToken(user,res,200)
});

// REGISTER --server/register --post
exports.register = catchAsyncError(async (req, res, next) => {

 
    const {name,email,password}=req.body;
  if ( !name ||! email || ! password) {
    return res.status(401).json({
      success: false,
      message: "fill the values ..!",
    });
  }



  let userData={
    name,
    password,
    email 
  }

 const user= await  User.create(userData)
user.save()

setToken(user,res,200)
});

// update password --server/update --put
exports.updatePassword = catchAsyncError(async (req, res, next) => {

  const {email,password,oldPassword}=req.body;
  if(!email||!password||!oldPassword){
    return res.status(401).json({
      success: false,
      message: "fill the values ..!",
    });
  }

  const user=await User.findOne({email}).select('+password')
  if(!user){
    return res.status(401).json({
      success: false,
      message: "User Not Found",
    });
  }

const passwordisValid=await user.isValidPassword(oldPassword)

if (!passwordisValid) {
  return res.status(401).json({
    success: false,
    message: "Wrong Password..!",
  });
}

user.password=password
await user.save();

res.status(200).json({
    success: true,
    message: "login Success",
    user
  });
});


// FORGOT PASSWORD --http://localhost:4000/server/password/forgot

exports.forgotPassword = catchAsyncError(async (req, res, next) => {

  const {email}=req.body;
  if(!email){
    return res.status(401).json({
      success: false,
      message: "Enter Valid Email..",
    });
  }

  const user=await User.findOne({email}).select('+password')
  if(!user){
    return res.status(401).json({
      success: false,
      message: "User Not Found",
    });
  }

  const token=await user.getResetToken()
  // const hase=await user.hashResetToken(token)

  // user.passwordResetToken=hase
  // user.resetPasswordTokenExpire=Date.now() +30*60*1000;
  user.save()
let BASE_URL=process.env.FRONTEND_URL

  if(process.env.NODE_ENV==='Production'){

    BASE_URL=`${req.protocol}://${req.get('host')}`
  }

  let sendMessage=`Your Password Changing link \n\n
        ${BASE_URL}//password/reset/${token}\n\n\n\n
      NOTE:  if Your Not request for change password then Dot Touch this link
  `

try {
  
sendMail({
  email:user.email,
  subject:"password recovery",
  message:sendMessage
})
res.status(200).json({
  success:true,
  message:`Email Send To ${user.email}`
})
} catch (error) {
  console.log(error);
user.passwordResetToken=undefined;
 user.resetPasswordTokenExpire=undefined
 await user.save({validateBeforeSave:true})
 return next(new ErrorHandler(error.message,500))
}

});


// Change Password After Send reset token in mail --
exports.changePassword = catchAsyncError(async (req, res, next) => {

  const {password,confirmPassword,id}=req.body;

  let passwordResetToken=await crypto.createHash('sha256').update(id).digest('hex')
  const user=await User.findOne({
    passwordResetToken,
    resetPasswordTokenExpire: { $gt: Date.now() }
})
console.log(user);
  if(!user){
    return res.status(401).json({
      success: false,
      message: "token expires re send Mail....!!",
    });
  }
  
  if(!password||!confirmPassword){
    return res.status(401).json({
      success: false,
      message: "Enter The Value..!!",
    });
  }

  user.resetPasswordTokenExpire=undefined;
  user.passwordResetToken=undefined;
  user.password=password;
  user.save()
  setToken(user,res,200)
});
exports.logoutUser = catchAsyncError(async (req, res, next) => {

  const {token} =req.cookies;
  console.log(token);
  res.status(200).cookie('token',token,{expires:new Date(Date.now()),httpOnly:true}).json({
    success:true,
    message:"logout Success"
  })
});


