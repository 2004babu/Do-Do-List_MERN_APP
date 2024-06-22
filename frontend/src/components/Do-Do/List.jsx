import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteDoDO } from '../../Actions/DoDoActions'
import {format} from 'date-fns'
const List = ({item}) => {
  const dispatch=useDispatch()
  const handleDelete=(e,id)=>{
    e.target.disabled=true
    console.log(id);
    dispatch(deleteDoDO(id))

  }

  let newDate=format(new Date(item.cretaAt),'h:mm:ss ,dd-MMM-yyyy ')
  return (
    <tr >
        <td className=' text-wrap col px-md-5 px-sm-1  '>{item.Data.title}</td>
        <td className='text-wrap col px-md-5 px-sm-1 '>{item.Data.subject}</td>
        <td className='text-wrap col px-md-5 px-sm-1'>{newDate}</td>
        <td className='text-wrap col px-md-5 px-sm-1  d-flex colum gap-1' >{(<Fragment>
           
            <button className='col px-md-2 px-sm-1 '  type='button' id='edit_page_btn' style={{backgroundColor:'#49108B'}}  ><Link id='edit'  to={`edit/${item._id}`} className='col-12 py-3 px-3 px-md-3' >Edit</Link></button>
            <button className='col px-md-2 px-sm-1 ' type='button'  id='edit_page_btn' style={{backgroundColor:'#FF3EA5'}} onClick={(e)=>{handleDelete(e,item._id)}} >Delete</button>
           
        </Fragment>)}</td>
    </tr>
  )
}

export default List
