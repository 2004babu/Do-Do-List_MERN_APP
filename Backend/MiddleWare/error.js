
const ErrorHandler =require('../utils/ErrorHandler')
module.exports=(err,req,res,next)=>{
    err.statusCode=this.statusCode||500

    if(process.env.NODE_ENV==='Devlopment'){

        console.log(err);
    }
}