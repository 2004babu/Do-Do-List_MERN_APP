const ErrorHandler = require("../utils/ErrorHandler");
module.exports = (err, req, res, next) => {
  err.statuscode = this.statuscode || 500;
  
  res.status(err.statuscode).json({
    message: err.message,
    stack: err.stack,
    error: err,
  });
  if (process.env.NODE_ENV == "development") {
    res.status(err.statuscode).json({
      success: false,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  }
 else if(process.env.NODE_ENV == "Production"){
    let message=err.message
    let error=new Error(message)

    res.status(err.statuscode).json({
        message:err.message||'internal Server Error'

    })
  }else{
    res.status(err.statuscode).json({
        success: false,
        message: "An error occurred",
      });
  }
};
