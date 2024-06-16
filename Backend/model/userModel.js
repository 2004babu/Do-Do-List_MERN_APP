const mongoose=require('mongoose')
const validator=require('validator')
const uniqueValidator=require('mongoose-unique-validator')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const crypto = require("crypto");


const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'plaese Enter Name ']
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,'please Enter Valid E-Mail'],
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    createAt:{
        type:Date,
        default:Date.now()
    },
    avatar:{
        type:String
    },
    role:{
        type:String,
        default:'user'
    },
    passwordResetToken:String,
    resetPasswordTokenExpire: Date,

})


userSchema.methods.isValidPassword=async function(enteredpassword){
// console.log('Entered password:', enteredpassword);
// console.log('Stored password:', this.password);
  return  await bcryptjs.compare(enteredpassword,this.password)
}


// genarate bcryptjs.hash  for password security 

userSchema.pre('save', async function(next) {
    console.log('hash');
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = 10;
        this.password = await bcryptjs.hash(this.password, salt);
        console.log(salt);
        next();
    } catch (error) {
        next(error);
        console.log(error,"error in userModel hase IN bcrypt ");
    }
});

userSchema.plugin(uniqueValidator,{
    message: "Error, expected {PATH} to be unique. {VALUE} already exists",

})

userSchema.methods.getJWT=function(){
    return  jwt.sign({id:this.id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_TIME})

}


userSchema.methods.getResetToken=async function () {
   const token=  crypto.randomBytes(20).toString('hex')
   console.log("token",this.passwordResetToken);
   this.passwordResetToken= crypto.createHash('sha256').update(token).digest('hex')
   console.log("token",this.passwordResetToken);

    this.resetPasswordTokenExpire=Date.now() +30*60*1000;
   return token
}
// userSchema.methods.hashResetToken=async function(token){

// }
const userModel=mongoose.model('user',userSchema);
module.exports= userModel;