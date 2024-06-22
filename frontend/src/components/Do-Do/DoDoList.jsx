import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {  getallDoDo } from "../../Actions/DoDoActions";
import List from "./List";
import { clearDoDoDeleted, clearError } from "../../Slice/DoDoSlice";
import { toast } from "react-toastify";
import MetaData from "../layouts/MetaData";

const DoDoList = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  
  const { isAuthenticatedUser = null } = useSelector(
    (State) => State.authState
  );
const navigate=useNavigate()
  
  const {
    DoDo: dodostate = [],
    isDoDoDeleted = null,
    error = null,
    isDoDoUpdated = false,
  } = useSelector((State) => State.DoDoState);

  let filtered;



  filtered = dodostate;
  if (search) {
    filtered = dodostate.filter((item) => {
      return (
        item.Data.title.toLowerCase().includes(search.toLowerCase()) ||
        item.Data.subject.toLowerCase().includes(search.toLowerCase())
      );
    });
  }
 
  useEffect(() => {
    if (isDoDoDeleted) {
      toast('Delete success',{type:'success',onOpen:()=>{
        dispatch(clearDoDoDeleted())
        
      }})
    }
    if (isAuthenticatedUser) {
      dispatch(getallDoDo);
    }
    if (!isAuthenticatedUser) {
      navigate('/login')
    }
    if(error){
      toast(error,{type:'error',onOpen:()=>{
        dispatch(clearError())
        
      }})
    }
    
  }, [dispatch,error,isDoDoDeleted,isAuthenticatedUser,isDoDoUpdated,navigate]);
  return (
    <Fragment>
      <MetaData title={'DoDoList'}/>
      <div className="input-gruop">
        <label htmlFor="search">Search</label>
        <input
          type="text"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control"
        />
       
      </div>
      <Fragment>
      {isAuthenticatedUser &&<div className="flex-colum" id="createdodo"><button  className="btn-green btn">
            <Link to={"/createdodo"} >Add DoDo</Link>
          </button ></div>}
        <table border={2}  className=" table table-striped table-hover table-bordered  mt-2">
         <thead>
          <tr className="table-dark">
            <th className="col text-center">Title</th>
            <th className="col text-center">subject</th>
            <th className="col text-center">CreateAt</th>
            <th className="col text-center">Edit/Delete</th>
          </tr>
          </thead> 
          <tbody>

          {isAuthenticatedUser &&filtered.length ? (
            filtered.map((item) => <List key={item._id} item={item} />)
          ):null }
          </tbody>
          
              
          
        </table>
           
      </Fragment>
    </Fragment>
  );
};

export default DoDoList;
