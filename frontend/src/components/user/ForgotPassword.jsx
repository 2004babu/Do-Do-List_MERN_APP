import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector}from'react-redux'
import { resetPasswordToken } from '../../Actions/authAction';
import { ClearSendResetToken, clearError } from '../../Slice/authSlice';
import { toast } from 'react-toastify';
import MetaData from '../layouts/MetaData';
const ForgotPassword = () => {
    const {loading=false,error=null,isSendToken=null,isAuthenticatedUser=false}=useSelector(state=>state.authState)

    const [email,setEmail]=useState('')
const dispatch=useDispatch()
    const handleSubmit=(e)=>{
        e.preventDefault();
// /api/server/password/forgot
        dispatch(resetPasswordToken(email))

    }
    useEffect(()=>{
        if(isSendToken){
            toast(`send token your Email `,{
              type:'success',
              onOpen:()=>{
                dispatch(ClearSendResetToken())
              }
            })
            
            return
          }
        if(isAuthenticatedUser){
            toast(`login success .... `,{
              type:'success',
              
            })
            
            return
          }

          if(error){
            toast(error,{
              type:'error',
              onOpen:()=>{
                dispatch(clearError())
              }
            })
            return
          }
          

    },[isSendToken,error,isAuthenticatedUser,dispatch])
  return (
    <div className='row h-70 d-flex justify-content-center shadow p-2 bg-body-tertiary rounded'>
      <MetaData title={'ForgotPassword'}/>
      <h2 className='fs-6 mb-5 text-center fw-bold'>Forgot Password</h2>
      <form action="#" onSubmit={handleSubmit} className='form-group'>
        <label htmlFor="ForgotPassword" style={{ display: 'block', marginBottom: '8px' }}>Email</label>
        <input
          type="email"
          id="ForgotPassword"
          className="form-control"
          placeholder='E-Mail'
          value={email}
          onChange={e=>setEmail(e.target.value)}
          style={{ padding: '10px', marginBottom: '15px', width: '100%', boxSizing: 'border-box' }}
        />
        <button type="submit" disabled={loading} className="btn btn-primary mt-3 p-2 px-3 ">Send Mail</button>
      </form>
    </div>
  )
}

export default ForgotPassword;
