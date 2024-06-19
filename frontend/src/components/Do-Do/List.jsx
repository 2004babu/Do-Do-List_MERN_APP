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
        <td className=' text-wrap col px-md-5 px-sm-1  '>{item.Data.title}</td>
        <td className='text-wrap col px-md-5 px-sm-1 '>{item.Data.subject}</td>
        <td className='text-wrap col px-md-5 px-sm-1'>{item.cretaAt}</td>
        <td className='text-wrap col px-md-5 px-sm-1  d-flex colum gap-1' >{(<Fragment>
           
            <button className='col px-md-2 px-sm-1 '  type='button' id='edit_page_btn' style={{backgroundColor:'#49108B'}}  ><Link id='edit'  to={`edit/${item._id}`} className='col-12 py-3 px-3 px-md-3' >Edit</Link></button>
            <button className='col px-md-2 px-sm-1 ' type='button'  id='edit_page_btn' style={{backgroundColor:'#FF3EA5'}} onClick={(e)=>{handleDelete(e,item._id)}} >Delete</button>
           
        </Fragment>)}</td>
    </tr>
  )
}

export default List
