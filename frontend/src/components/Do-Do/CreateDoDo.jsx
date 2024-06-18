import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layouts/MetaData'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createDoDo } from '../../Actions/DoDoActions';
import { clearDoDoCreated, clearError } from '../../Slice/DoDoSlice';
import { toast } from 'react-toastify';
const CreateDoDo = () => {
    const disaptch = useDispatch();
    const navigate = useNavigate();
    const {
        DoDo:dodostate={},
        loading= false,
        isDoDoDeleted= null,
        error= null,
        isDoDoUpdated= false,
        isDoDoCreated= false,
    } = useSelector((State) => State.DoDoState);
    const [title, setTitle] = useState("");
    const [DoDo, setDoDo] = useState("");
    const handleSubmit = (e) => {
      e.preventDefault();
      const data = {
        title,
        subject:DoDo,
      };
      disaptch(createDoDo(data));
    };
  
    useEffect(() => {
      if (isDoDoCreated) {
        toast("DoDo created success", { type: "success" ,onOpen:()=>{
            disaptch(clearDoDoCreated())
        }});
        navigate('/')
      }
      if (error) {
        toast(error, { type: "error" ,onOpen:()=>{
          disaptch(clearError())
        }});
      }
    }, [isDoDoCreated, error, clearError,disaptch]);
  return (
    <Fragment>
      <MetaData title={"Create DoDo "} />
      <div className="login-page">
        <form action="#" onSubmit={handleSubmit}>
          <h1 className="mb-3">login</h1>
          <div className="data-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="input"
              name='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="data-group">
            <label htmlFor="DoDo" className='small_lebel'>DoDo</label>
            <textarea
             cols={24}
             rows={8}
             name='DoDo'
             value={DoDo}
             onChange={(e) => setDoDo(e.target.value)}
            //  style={{width: "165px;" ,height: "91px;"}}
            
             >
            </textarea>
          </div>
          <button disabled={loading}>Submit</button>
        </form>
      </div>
    </Fragment>
  )
}

export default CreateDoDo
