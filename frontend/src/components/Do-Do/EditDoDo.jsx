import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearDoDoUpdate, clearError } from '../../Slice/DoDoSlice';
import { getSingleDoDo, updateDoDo } from '../../Actions/DoDoActions';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditDoDo = () => {
    const dispatch = useDispatch();
    const {id}=useParams()
    const { isAuthenticatedUser = null } = useSelector(
        (State) => State.authState
    );
    
    
    const {
        DoDo: dodostate = [],
        loading = false,
        isDoDoDeleted = null,
        error = null,
        isDoDoUpdated = false,
      isDoDoCreated = false,
    } = useSelector((State) => State.DoDoState);
    
    
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState();

    
const handleSubmit=(e)=>{
e.preventDefault();
const info= {
    Data:{
        title,
        subject
    },
    DoDoId:id
}
dispatch(updateDoDo(info))
}
    useEffect(() => {
        if (isDoDoUpdated) {
          toast('updated  success',{type:'success',onOpen:()=>{
            dispatch(clearDoDoUpdate())
            
          }})
        }
        if(error){
          toast(error,{type:'error',onOpen:()=>{
            dispatch(clearError())
          }})
        }
        
        dispatch(getSingleDoDo(id));
      }, [dispatch, isAuthenticatedUser,isDoDoUpdated]);

      useEffect(()=>{
        if (dodostate.Data.subject) {
            setSubject(dodostate.Data.subject)
            setTitle(dodostate.Data.title)
        }
      },[dodostate])
  return (
    <Fragment>
         <div id="index_container">
        <form action="#" className="form-control" onSubmit={handleSubmit}> 
            <h2>Edit DoDo </h2>
                <div className="data-group">
                    <label htmlFor="title" className="small_lebel">tilte</label>
                    <input type="text"
                    name="title"
                    className="input"
                    value={title}
              onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="data-group">
                    <label htmlFor="subject" className="small_lebel text-left " >subject</label>
                    <textarea  cols={25} type="text"
                    rows={3}
                    name="subject"
                    className="input text-small-start fs-6"

                    value={subject}
              onChange={(e) => setSubject(e.target.value)}
                    ></textarea>
                </div>
                <div className="data-group justify-cotent-center ">
                <button type='submit' disabled={loading} className="btn btn-primary p-10 mt-3 "> Save Changes </button>

                </div>
        </form>
    </div>
      
    </Fragment>
  )
}

export default EditDoDo
