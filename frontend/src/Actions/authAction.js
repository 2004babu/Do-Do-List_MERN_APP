import { LogoutUserFail, LogoutUserRequest, LogoutUserSuccess, loadUserFail, loadUserRequest, loadUserSuccess, userFail, userRequest, userSuccess, userUpdateFail, userUpdateRequest, userUpdateSuccess } from "../Slice/authSlice"
import axios from 'axios'

//login process 
export const getUser=userdata=>async(dispatch)=>{
    try {
        dispatch(userRequest())
        const {data}=await axios.post('/server/login',userdata)
        dispatch(userSuccess(data))
    } catch (error) {
        dispatch(userFail(error.response.data.error))
    }
}

// registerUser
export const registerUser=userdata=>async(dispatch)=>{
    try {
        dispatch(userRequest())
        const {data}=await axios.post('/server/register',userdata)
        dispatch(userSuccess(data))
    } catch (error) {
        dispatch(userFail(error.response.data.error))
    }
}
// upateUser
export const UpdateUser=userdata=>async(dispatch)=>{
    try {
        dispatch(userUpdateRequest())
        const {data}=await axios.put('/server/password/update',userdata)
        dispatch(userUpdateSuccess(data))
    } catch (error) {
        dispatch(userUpdateFail(error.response.data.error))
    }
}

// logoutUser
export const logoutUser=async(dispatch)=>{
    try {
        dispatch(LogoutUserRequest())
        await axios.delete('/server/logout')
        dispatch(LogoutUserSuccess())
    } catch (error) {
        dispatch(LogoutUserFail(error.response.data.error))
    }
}

// load User -initial using cookies
export const loaduser=async(dispatch)=>{
    try {
        dispatch(loadUserRequest())
       const {data}= await axios.get('/server/login')
        dispatch(loadUserSuccess(data))
    } catch (error) {
        dispatch(loadUserFail())
    }
}

