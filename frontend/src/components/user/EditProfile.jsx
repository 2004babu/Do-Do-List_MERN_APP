import React, { useEffect, useState } from "react";
import {useDispatch, useSelector}from 'react-redux'
import {toast} from 'react-toastify'
import {useNavigate}from 'react-router-dom'
import { updateProfile} from'../../Actions/authAction'
import { clearError, clearProfileUpdated } from "../../Slice/authSlice";
import MetaData from "../layouts/MetaData";
const EditProfile = () => {
  const {user={},isProfileUpdated=null,error=null,loading=false}=useSelector(state=>state.authState)
  const navigate=useNavigate()
  const {name:sname='',avatar}=user;
  const [name, setName] = useState(sname);
  
  const [Avatar, setAvatar] = useState(avatar);
  const [AvatarPreview, setAvatarPreview] = useState(avatar);
const dispatch=useDispatch()
  const handleAvatar=(e)=>{
    const reader=new FileReader()
      reader.onload=()=>{
        if (reader.readyState===2) {
          setAvatar(e.target.files[0])
          setAvatarPreview(reader.result)
        }
      }
    reader.readAsDataURL(e.target.files[0])
  }

  const handleSubmit=(e)=>{
    e.preventDefault();

    const formData=new FormData()

    formData.append('name',name)
    
    if (Avatar) {
      
      formData.append('avatar',Avatar)
    }

    dispatch(updateProfile(formData))
  }

  useEffect(()=>{
    if(isProfileUpdated){
      toast('update Success ',{
        type:'success',
        onOpen:()=>{
          dispatch(clearProfileUpdated())
        }
      })
      navigate('/profile')
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

  },[isProfileUpdated,error,dispatch,navigate])

 
  return (
    <form onSubmit={handleSubmit} className="row mt-5 p-4 d-flex gap-2">
      <MetaData title={'EditProfile'}/>
      <div className="form-group">
        <label htmlFor="editprofilename" className="form-label">Name</label>
        <input type="text" name="" value={name} onChange={e=>setName(e.target.value)} id="editprofilename" className="form-control" />
      </div>
      
      <div className="form-group">
        <label htmlFor="editprofileavatar" className="form-label">Avatar</label>
        <input type="file" name="" onChange={handleAvatar} id="editprofileavatar" className="form-control" />
      </div>
      <figure className="figure mt-3 ">
        <img src={AvatarPreview} alt="" height={'40px'} width={'40px'} className=" image-fluid rounded  object-fit-cover" />
      </figure>
      <div className="form-group d-flex justify-content-center">
      <button type="submit"  className="btn btn-success p-1 mt-2 col-4" disabled={loading}>Save Changes</button>

      </div>
    </form>
  );
};

export default EditProfile;
