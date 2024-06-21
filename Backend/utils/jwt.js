module.exports=async function(user,res,statuscode){
    try {
        console.log(process.env.JWT_EXPIRES_TIME);

        // Ensure JWT_EXPIRES_TIME is parsed as an integer
        const jwtExpiresTime = parseInt(process.env.JWT_EXPIRES_TIME, 10);
console.log(jwtExpiresTime);
        // Generate the JWT token
        const token = await user.getJWT();

        // Define cookie options
        const jwtOption = {
            expires: new Date(Date.now() + jwtExpiresTime * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' // Use secure cookies in production
        };

        // Set the cookie and respond with success
        res.status(statuscode)
            .cookie('token', token, jwtOption)
            .json({
                success: true,
                user,
                token
            });
    } catch (error) {
        // Handle token generation error
        res.status(500).json({
            success: false,
            message: 'Token generation failed',
            error: error.message
        });
    }
}
