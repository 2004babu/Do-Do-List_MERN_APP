import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useNavigate, useParams } from 'react-router-dom'
import { ClearChangePassword, clearError } from '../../Slice/authSlice'
import { changePassword } from '../../Actions/authAction'
import {toast}from'react-toastify'
import MetaData from '../layouts/MetaData'
const ResetPassword = () => {
    const {loading=false,error=null,isPasswordChange=null,isAuthenticatedUser=false}=useSelector(state=>state.authState)
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const {id}=useParams()
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const handleSubmit=(e)=>{
        e.preventDefault()
        const userData={
            password,confirmPassword,id
        }

        dispatch(changePassword(userData))
    }
    useEffect(()=>{
        if(isPasswordChange){
            toast(`Password Change SuccessFully `,{
              type:'success',
              onOpen:()=>{
                dispatch(ClearChangePassword())
              }
            })
            navigate('/')
            return
        }
        if(isAuthenticatedUser){
            toast(`login success .... `,{
                type:'success',
                
            })
            
            navigate('/')
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
          

    },[isPasswordChange,error,isAuthenticatedUser,dispatch,navigate])
  return (
    <div className='col-lg-3  row d-flex justify-content-center align-items center p-3 mt-5 '>
         <MetaData title={'Reset Password'}/>
      <form action="# " onSubmit={handleSubmit} className="w-100 form-group p-5 mt-2 shadow bg-body-tertiary rounded">
        <h2 className='fs-6 mb-5 text-center fw-bold '>Change Password</h2>
        <label htmlFor="resetpass" className="form-label text-muted mt-3" style={{fontSize:"13px"}}>Password </label>
        <input type="password" name="" id="resetpass" className="form-control p-1 mt-1" 
        value={password}
        onChange={e=>setPassword(e.target.value)}
        
        />
        <label htmlFor="resetpass" className="form-label text-muted mt-3 " style={{fontSize:"13px"}}> Confirm Password </label>
        <input type="password" name="" id="resetpass" className="form-control p-1 mt-1" 
        value={confirmPassword}
        onChange={e=>setConfirmPassword(e.target.value)}

        />
        <button type="submit" disabled={loading} className="btn btn-info mt-4 px-2 text-dark ">submit</button>
      </form>
    </div>
  )
}

export default ResetPassword
