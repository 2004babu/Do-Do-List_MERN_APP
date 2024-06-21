import { LogoutUserFail, LogoutUserRequest, LogoutUserSuccess, changePasswordFail, changePasswordRequest, changePasswordSucces, loadUserFail, loadUserRequest, loadUserSuccess, profileUpdateFail, profileUpdateRequest, profileUpdateSuccess, sendResetTokenFail, sendResetTokenRequest, sendResetTokenSucces, userFail, userRequest, userSuccess, userUpdateFail, userUpdateRequest, userUpdateSuccess } from "../Slice/authSlice"
import axios from 'axios'

//login process 
export const getUser=userdata=>async(dispatch)=>{
    try {
        dispatch(userRequest())
        const {data}=await axios.post('/api/server/login',userdata)
        dispatch(userSuccess(data))
    } catch (error) {
        dispatch(userFail(error.response?.data?.message))
    }
}

// registerUser
export const registerUser = (userdata) => async (dispatch) => {
    try {
        console.log(userdata);
        dispatch(userRequest());
        
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }
        
        const { data } = await axios.post('/api/server/register', userdata, config);
        dispatch(userSuccess(data));
    } catch (error) {
        console.error(error); 
        dispatch(userFail(error.response?.data?.message ));
    }
};
// upateUser
export const UpdateUser=userdata=>async(dispatch)=>{
    try {
        dispatch(userUpdateRequest())
        const {data}=await axios.put('/api/server/password/update',userdata)
        dispatch(userUpdateSuccess(data))
    } catch (error) {
        dispatch(userUpdateFail(error.response?.data?.message))
    }
}

// logoutUser
export const logoutUser=async(dispatch)=>{
    try {
        dispatch(LogoutUserRequest())
        await axios.delete('/api/server/logout')
        dispatch(LogoutUserSuccess())
    } catch (error) {
        dispatch(LogoutUserFail(error.response?.data?.message))
    }
}

// load User -initial using cookies
export const loaduser=async(dispatch)=>{
    try {
        dispatch(loadUserRequest())
       const {data}= await axios.get('/api/server/login')
        dispatch(loadUserSuccess(data))
    } catch (error) {
        dispatch(loadUserFail())
        // error.response.data.message
    }
}


export const updateProfile=userdata=>async(dispatch)=>{
try {
    const config={
        Headers:{
            'Content-Type':'multipart/form-Data'
        }
    }

    dispatch(profileUpdateRequest())
    const {data}=await axios.post('/api/server/profile/update',userdata,config)
    dispatch(profileUpdateSuccess(data))

} catch (error) {
    console.log('error',error)
    dispatch(profileUpdateFail(error.response?.data?.message))
}
}

// make reset token by take their email 
export const resetPasswordToken=userdata=>async(dispatch)=>{
try {
    

    dispatch(sendResetTokenRequest())
   await axios.post('/api/server/password/forgot',{email:userdata})
    dispatch(sendResetTokenSucces())

} catch (error) {
    console.log('error',error)
    dispatch(sendResetTokenFail(error.response?.data?.message))
}
}

//  change password using sended email url
export const changePassword=userdata=>async(dispatch)=>{
try {
    
    dispatch(changePasswordRequest())
   const {data}=await axios.post('/api/server/password/change',userdata)
    dispatch(changePasswordSucces(data))

} catch (error) {
    console.log('error',error)
    dispatch(changePasswordFail(error.response?.data?.message))
}
}