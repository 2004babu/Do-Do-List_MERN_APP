const mongoose  = require("mongoose");
const catchAsyncError = require("../MiddleWare/catchAsyncError");
const DoDo_Model = require("../model/Do-Do-Model");
const ErrorHandler = require("../utils/ErrorHandler");


// create DoDo --http://localhost:4000/server/dodo   --post
exports.createDoDo = catchAsyncError(async (req, res, next) => {
  const user = req.user;

  const { Data } = req.body;
  if (!Data) {
    return next(new ErrorHandler("send DoDo Data", 304));
  }
  const setDoDoData = {
    Data,
    user,
  };
 

  const DoDo = await DoDo_Model.create(setDoDoData);
  if (!DoDo) {
    return next(new ErrorHandler("Error in Model", 401));
  }

  res.status(200).json({
    success: true,
    DoDo,
  });
});


// updateDoDo  --http://localhost:4000/server/dodo --put
exports.updateDoDo = catchAsyncError(async (req, res, next) => {

  const {DoDoId, Data } = req.body;
  let Modified= Date.now();
  if (!Data) {
    return next(new ErrorHandler("send DoDo Data", 304));
  }
  if (!DoDoId) {
    return next(new ErrorHandler("send DoDoId", 304));
  }
  
  const setDoDoData = {
    Data,
    Modified
  };
 


  const DoDo = await DoDo_Model.findByIdAndUpdate(DoDoId,setDoDoData);
  if (!DoDo) {
    return next(new ErrorHandler("Error in Model", 401));
  }
console.log(DoDo);
  res.status(200).json({
    success: true,
    DoDo,
  });
});
// deleteDoDo  --http://localhost:4000/server/dodo --delete
exports.deleteDoDo = catchAsyncError(async (req, res, next) => {

 
  const {id } = req.params;

  if (!id) {
    return next(new ErrorHandler("send DoDoId", 304));
  }

  const DoDo = await DoDo_Model.findByIdAndDelete(id);
  if (!DoDo) {
    return next(new ErrorHandler("Error in Model", 401));
  }
console.log(DoDo);
  res.status(200).json({
    success: true,
    DoDo,
    message:"deleted Success"
  });
});


// GET SINGLE DODO  --http://localhost:4000/server/dodo/:id --get
exports.getSingleDoDo = catchAsyncError(async (req, res, next) => {

  const {id } = req.params;

  if (!id) {
    return next(new ErrorHandler("send DoDoId", 304));
  }

  const DoDo = await DoDo_Model.findById(id);
  if (!DoDo) {
    return next(new ErrorHandler("Error in Model", 401));
  }
console.log(DoDo);
  res.status(200).json({
    success: true,
    DoDo,
  });
});


// GET alll DODO  --http://localhost:4000/server/getalldodo --get
exports.getAllDoDo = catchAsyncError(async (req, res, next) => {
  if (!req.user||!req.user._id) {
    return next(new ErrorHandler("login firs to handle this ", 401));
    
  }
  const userId= req.user._id


  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return next(new ErrorHandler("Invalid user ID", 400));
  }

  const DoDo = await DoDo_Model.find({user:userId});
  if (!DoDo || DoDo.length === 0) {
    return res.status(200).json({
      success:true,
      message:"No DoDO Here ...!! Crate New DoDo"
    });
  }
// console.log(DoDo);
  res.status(200).json({
    success: true,
    DoDo,
  });

});

exports.getLocalDoDo = catchAsyncError(async (req, res, next) => {
  console.log(req.body);
  console.log(req.user);

  const filtered = req.body.map(item => {
    const dateString = item.cretaAt;
    const dateParts = dateString.split(/[\s,\/:]+/);
    const dateObject = new Date(
      dateParts[2],
      dateParts[1] - 1,
      dateParts[0],
      dateParts[3],
      dateParts[4],
      dateParts[5]
    );

    return {
      Data: {
        title: item.Data.title,
        subject: item.Data.subject,
      },
      cretaAt: dateObject,
      user: req.user._id,
    };
  });

  console.log(filtered);

  try {
    const dodo = await DoDo_Model.create(filtered);
    console.log(dodo);
    res.status(201).json({
      success: true,
      data: dodo
    });
  } catch (error) {
    console.error('Error saving Dodo:', error);
    // next(error); // Pass the error to the error handling middleware
  }
});
