import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteDoDO } from '../../Actions/DoDoActions'
import {toast} from 'react-toastify'
import { clearDoDoDeleted } from '../../Slice/DoDoSlice'
const List = ({item}) => {
  const dispatch=useDispatch()
  const handleDelete=(e,id)=>{
    e.target.disabled=true
    console.log(id);
    dispatch(deleteDoDO(id))

  }
  const {
    DoDo: dodostate = [],
    loading = false,
    isDoDoDeleted = null,
    error = null,
    isDoDoUpdated = false,
    isDoDoCreated = false,
  } = useSelector((State) => State.DoDoState);
  useEffect(()=>{
    
  },[isDoDoDeleted])
  return (
    <tr >
        <td>{item.Data.title}</td>
        <td>{item.Data.subject}</td>
        <td>{item.cretaAt}</td>
        <td>{(<Fragment>
           
            <button  type='button' id='edit_page_btn' style={{backgroundColor:'blue'}}  ><Link id='edit' to={`edit/${item._id}`} >Edit</Link></button>
            <button  type='button'  id='edit_page_btn' style={{backgroundColor:'red'}} onClick={(e)=>{handleDelete(e,item._id)}} >Delete</button>
           
        </Fragment>)}</td>
    </tr>
  )
}

export default List
