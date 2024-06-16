module.exports=async function(user,res,statuscode){
    const token=await user.getJWT();
    const jwtoption={
        expries:new Date(
            Date.now()+process.env.JWT_EXPIRES_TIME*24*60*60*1000
        )
        ,httpOnly:true
    }
    res.status(statuscode).cookie('token',token,jwtoption).json({
        success: true,
        user,
        token
    })
}
