import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteDoDO, getallDoDo } from "../../Actions/DoDoActions";
import List from "./List";
import { clearDoDoDeleted, clearError } from "../../Slice/DoDoSlice";
import { toast } from "react-toastify";

const DoDoList = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  
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

  let filtered;



  filtered = dodostate;
  if (search) {
    filtered = dodostate.filter((item) => {
      if (
        item.Data.title.toLowerCase().includes(search.toLowerCase()) ||
        item.Data.subject.toLowerCase().includes(search.toLowerCase())
      ) {
        return item;
      }
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
    if(error){
      toast(error,{type:'error',onOpen:()=>{
        dispatch(clearError())
        
      }})
    }
    
  }, [dispatch,error,isDoDoDeleted,isAuthenticatedUser,isDoDoUpdated]);
  return (
    <Fragment>
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
        <table border={2}  className=" table table-striped table-hover table-bordered  mt-4">
         <thead>
          <tr className="table-dark">
            <th className="col text-center">Title</th>
            <th className="col text-center">subject</th>
            <th className="col text-center">CreateAt</th>
            <th className="col text-center">Edit/Delete</th>
          </tr>
          </thead> 
          <tbody>

          {filtered.length ? (
            filtered.map((item) => <List key={item._id} item={item} />)
          ):null }
          </tbody>
          
              
          
        </table>
            <div className="flex-colum" id="createdodo"><button  className="btn-green">
            <Link to={"/createdodo"} >Add DoDo</Link>
          </button ></div>
      </Fragment>
    </Fragment>
  );
};

export default DoDoList;
